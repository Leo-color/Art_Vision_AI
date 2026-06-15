// State
let state = {
    cameraActive: false,
    imageData: null,
    analysisResults: null,
    accessCode: '12345678',
    enteredCode: '',
    currentScreen: 'main',
    scanHistory: [],
    sessionStartTime: null,
    isSpeaking: false,
    speechUtterance: null
};

// Elements - Login
const loginScreen = document.getElementById('loginScreen');
const codeDisplay = document.getElementById('codeDisplay');
const loginError = document.getElementById('loginError');
const deleteBtn = document.getElementById('deleteBtn');
const submitBtn = document.getElementById('submitBtn');

// Elements - Main App
const paintingImage = document.getElementById('paintingImage');
const paintingFrame = document.getElementById('paintingFrame');
const cameraPreview = document.getElementById('cameraPreview');
const canvas = document.getElementById('canvas');
const aiLabel = document.getElementById('aiLabel');
const detectedBox = document.getElementById('detectedBox');
const detectedValue = document.getElementById('detectedValue');
const centerBtn = document.getElementById('centerBtn');
const loadingOverlay = document.getElementById('loadingOverlay');
const resultsOverlay = document.getElementById('resultsOverlay');
const resultsScroll = document.getElementById('resultsScroll');
const closeResults = document.getElementById('closeResults');

// Main screen container
const mainScreen = document.querySelector('.main-screen');

// Event Listeners - Login
document.querySelectorAll('.keypad-btn[data-num]').forEach(btn => {
    btn.addEventListener('click', function() {
        if (state.enteredCode.length < 8) {
            state.enteredCode += this.getAttribute('data-num');
            updateCodeDisplay();
        }
    });
});

deleteBtn.addEventListener('click', function() {
    state.enteredCode = state.enteredCode.slice(0, -1);
    updateCodeDisplay();
    loginError.style.display = 'none';
});

submitBtn.addEventListener('click', checkAccessCode);

// Event Listeners - Main App
if (centerBtn) centerBtn.addEventListener('click', handleCenterButton);
if (closeResults) closeResults.addEventListener('click', hideResults);

// Load paintings from library
function initPaintingsGallery() {
    const galleryStrip = document.getElementById('galleryStrip');
    galleryStrip.innerHTML = '';

    paintingsLibrary.forEach((painting, index) => {
        const btn = document.createElement('button');
        btn.className = 'gallery-item' + (index === 1 ? ' active' : '');
        btn.setAttribute('data-image', painting.url);
        btn.innerHTML = `
            <img src="${painting.thumb}" alt="${painting.title}">
            ${index === 1 ? '<span class="gallery-label">1x</span>' : ''}
        `;

        btn.addEventListener('click', function() {
            paintingImage.src = painting.url;
            document.querySelectorAll('.gallery-item').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            cameraPreview.style.display = 'none';
            paintingImage.style.display = 'block';
        });

        galleryStrip.appendChild(btn);
    });

    // Set initial painting
    paintingImage.src = paintingsLibrary[1].url;
}

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    initPaintingsGallery();
    // Auto-login for testing
    loginScreen.classList.add('hidden');
});

// ===== LOGIN FUNCTIONS =====
function updateCodeDisplay() {
    const dots = document.querySelectorAll('.code-dot');
    dots.forEach((dot, index) => {
        if (index < state.enteredCode.length) {
            dot.classList.add('filled');
        } else {
            dot.classList.remove('filled');
        }
    });
}

function checkAccessCode() {
    if (state.enteredCode.length !== 8) {
        showLoginError();
        return;
    }

    if (state.enteredCode === state.accessCode) {
        loginScreen.classList.add('hidden');
        console.log('✅ Access Granted!');
    } else {
        showLoginError();
        state.enteredCode = '';
        updateCodeDisplay();
    }
}

function showLoginError() {
    loginError.style.display = 'block';
    setTimeout(() => {
        loginError.style.display = 'none';
    }, 2000);
}

// ===== APP FUNCTIONS =====
function handleCenterButton() {
    if (state.cameraActive) {
        takePicture();
    } else if (state.imageData) {
        analyzeImage();
    } else {
        startCamera();
    }
}

async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
            audio: false
        });

        cameraPreview.srcObject = stream;
        cameraPreview.style.display = 'block';
        paintingImage.style.display = 'none';
        document.getElementById('scanPrompt').style.display = 'none';
        state.cameraActive = true;
    } catch (error) {
        alert('Camera error: ' + error.message);
    }
}

function takePicture() {
    const ctx = canvas.getContext('2d');
    canvas.width = cameraPreview.videoWidth;
    canvas.height = cameraPreview.videoHeight;

    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(cameraPreview, 0, 0);

    state.imageData = canvas.toDataURL('image/jpeg', 0.8);

    if (cameraPreview.srcObject) {
        cameraPreview.srcObject.getTracks().forEach(track => track.stop());
    }
    state.cameraActive = false;

    paintingImage.src = state.imageData;
    cameraPreview.style.display = 'none';
    paintingImage.style.display = 'block';
    document.getElementById('scanPrompt').style.display = 'none';
}

function saveScanData(imageData, analysisResults, success = true) {
    let scanHistory = [];
    const saved = localStorage.getItem('scanHistory');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            // Convert old format if needed
            if (Array.isArray(parsed) && parsed.length > 0) {
                if (parsed[0].title && !parsed[0].imageThumbnail) {
                    // Old format, reset
                    scanHistory = [];
                } else {
                    scanHistory = parsed;
                }
            }
        } catch (e) {
            scanHistory = [];
        }
    }

    scanHistory.unshift({
        id: Date.now(),
        timestamp: new Date().toLocaleString('it-IT'),
        imageThumbnail: imageData,
        analysisResults: analysisResults || {},
        success: success
    });

    // Keep only last 20 scans
    if (scanHistory.length > 20) {
        scanHistory.pop();
    }

    localStorage.setItem('scanHistory', JSON.stringify(scanHistory));
}

async function analyzeImage() {
    if (!state.imageData) return;

    loadingOverlay.style.display = 'flex';
    aiLabel.style.display = 'block';
    detectedBox.style.display = 'none';

    try {
        const response = await fetch('/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: state.imageData })
        });

        const result = await response.json();

        if (result.success) {
            state.analysisResults = result.data;
            saveScanData(state.imageData, result.data, true);
            displayResults();
        } else {
            state.analysisResults = null;
            saveScanData(state.imageData, null, false);
            displayResultsError();
        }
    } catch (error) {
        state.analysisResults = null;
        saveScanData(state.imageData, null, false);
        displayResultsError();
        console.error('Analysis error:', error);
    }
}

function displayResults() {
    loadingOverlay.style.display = 'none';

    const data = state.analysisResults;
    detectedValue.textContent = data.style || 'Analysis Complete';
    detectedBox.style.display = 'flex';

    // Add to history
    if (data.title && data.artist) {
        addToHistory(data.title, data.artist);
    }

    // Create header with speak button
    let html = `<div class="results-header">
        <h3>✨ ${data.title || 'Analisi Completa'}</h3>
        <button class="speak-all-btn" onclick="speakAllResults()">🔊 Ascolta</button>
    </div>`;

    // Show narrative as main text (if available)
    if (data.narrative) {
        html += `<div class="result-card narrative-card">
            <div class="narrative-text">${escapeHtml(data.narrative)}</div>
        </div>`;
    }

    // Add details cards (collapsible style)
    html += `<div class="details-section">`;

    const addDetail = (label, value, fieldKey) => {
        if (value && value.toString().trim()) {
            html += `<div class="result-card">
                <div class="result-label">${label}</div>
                <div class="result-text">${escapeHtml(value)}</div>
                <div class="discover-more" onclick="showDetail('${fieldKey}', '${label}')">📖 Scopri di più</div>
            </div>`;
        }
    };

    if (data.artist) addDetail('ARTISTA', data.artist, 'artist');
    if (data.year) addDetail('PERIODO', data.year, 'year');
    if (data.style) addDetail('STILE', data.style, 'style');
    if (data.location) addDetail('UBICAZIONE', data.location, 'location');
    if (data.materials) addDetail('MATERIALI', data.materials, 'materials');
    if (data.color_palette) addDetail('COLORI', data.color_palette, 'color_palette');
    if (data.interesting_facts) addDetail('CURIOSITÀ', data.interesting_facts, 'interesting_facts');

    html += `</div>`;

    resultsScroll.innerHTML = html;
    resultsOverlay.style.display = 'block';
}

function speakAllResults() {
    const data = state.analysisResults;

    // Use narrative if available, otherwise build from parts
    let fullText = data.narrative || buildNarrative(data);

    speakText(fullText);
}

function buildNarrative(data) {
    let text = '';

    if (data.title && data.artist) {
        text += `"${data.title}" di ${data.artist}. `;
    }

    if (data.year) {
        text += `Creato nel ${data.year}. `;
    }

    if (data.style) {
        text += `È un capolavoro del ${data.style}. `;
    }

    if (data.meaning) {
        text += `${data.meaning}. `;
    }

    if (data.description) {
        text += `${data.description}. `;
    }

    if (data.location) {
        text += `Attualmente si trova ${data.location}. `;
    }

    if (data.interesting_facts) {
        text += `Un fatto affascinante: ${data.interesting_facts}. `;
    }

    return text;
}

function displayResultsError() {
    loadingOverlay.style.display = 'none';

    const html = `<div class="results-header">
        <h3>⚠️ Analisi Non Riuscita</h3>
    </div>
    <div class="result-card error-card">
        <div class="error-message">
            <p><strong>🎨 ArtVision AI può sbagliare</strong></p>
            <p>Scusa, non sono riuscito ad analizzare l'immagine. Potrebbe essere:</p>
            <ul>
                <li>Un'immagine non sufficientemente chiara</li>
                <li>Un dipinto non riconosciuto dal mio database</li>
                <li>Un problema temporaneo di connessione</li>
            </ul>
            <p>Riprova a scansionare l'immagine con una migliore illuminazione!</p>
        </div>
    </div>`;

    resultsScroll.innerHTML = html;
    resultsOverlay.style.display = 'block';
}

function hideResults() {
    resultsOverlay.style.display = 'none';
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===== SCREEN NAVIGATION =====
function switchScreen(screenName) {
    const mainScreen = document.getElementById('mainScreen') || document.querySelector('.main-screen');
    const historyScreen = document.getElementById('historyScreen');
    const accountScreen = document.getElementById('accountScreen');
    const navBtns = document.querySelectorAll('.nav-btn');

    // Hide all screens
    if (mainScreen) mainScreen.style.display = 'none';
    historyScreen.style.display = 'none';
    accountScreen.style.display = 'none';

    // Remove active class from all nav buttons
    navBtns.forEach(btn => btn.classList.remove('active'));

    // Show selected screen and activate button
    if (screenName === 'main') {
        if (mainScreen) mainScreen.style.display = 'flex';
        document.getElementById('homeBtn').classList.add('active');
    } else if (screenName === 'history') {
        historyScreen.style.display = 'flex';
        document.getElementById('historyBtn').classList.add('active');
        loadHistory();
    } else if (screenName === 'account') {
        accountScreen.style.display = 'flex';
        document.getElementById('accountBtn').classList.add('active');
        updateSessionTime();
    }

    state.currentScreen = screenName;
}

// ===== HISTORY FUNCTIONS =====
function addToHistory(title, artist) {
    const timestamp = new Date().toLocaleTimeString('it-IT');
    state.scanHistory.unshift({ title, artist, timestamp });
    if (state.scanHistory.length > 10) state.scanHistory.pop();
    localStorage.setItem('scanHistory', JSON.stringify(state.scanHistory));
}

function loadHistory() {
    const saved = localStorage.getItem('scanHistory');
    let scanHistory = [];

    if (saved) {
        try {
            scanHistory = JSON.parse(saved);
        } catch (e) {
            scanHistory = [];
        }
    }

    const historyContent = document.getElementById('historyContent');
    if (scanHistory.length === 0) {
        historyContent.innerHTML = '<p class="empty-state">Nessuna scansione ancora</p>';
        return;
    }

    historyContent.innerHTML = scanHistory.map((item, index) => `
        <div class="history-item" onclick="loadHistoryItem(${index})">
            <div class="history-item-thumbnail">
                <img src="${item.imageThumbnail}" alt="Scansione">
            </div>
            <div class="history-item-info">
                <p class="history-time">${item.timestamp}</p>
                <p class="history-title">
                    ${item.analysisResults?.title || 'Scansione non riconosciuta'}
                    ${item.analysisResults?.artist ? ' • ' + item.analysisResults.artist : ''}
                </p>
                ${item.success ? '' : '<p class="history-status">⚠️ Analisi non riuscita</p>'}
            </div>
        </div>
    `).join('');
}

function loadHistoryItem(index) {
    const saved = localStorage.getItem('scanHistory');
    if (!saved) return;

    let scanHistory = [];
    try {
        scanHistory = JSON.parse(saved);
    } catch (e) {
        return;
    }

    const item = scanHistory[index];
    if (!item) return;

    if (item.success && item.analysisResults) {
        state.analysisResults = item.analysisResults;
        displayResults();
    } else {
        displayResultsError();
    }

    switchScreen('main');
}

// ===== ACCOUNT FUNCTIONS =====
function updateSessionTime() {
    if (!state.sessionStartTime) {
        state.sessionStartTime = Date.now();
    }
    const elapsed = Math.floor((Date.now() - state.sessionStartTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    const timeStr = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    document.getElementById('sessionTime').textContent = timeStr;
}

function logout() {
    if (confirm('Sei sicuro di voler fare logout?')) {
        state.sessionStartTime = null;
        loginScreen.classList.remove('hidden');
        switchScreen('main');
        state.enteredCode = '';
        updateCodeDisplay();
    }
}

// ===== NAVIGATION EVENT LISTENERS =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize paintings gallery
    if (typeof initPaintingsGallery === 'function') {
        initPaintingsGallery();
    }

    // Screen navigation buttons
    const homeBtn = document.getElementById('homeBtn');
    const historyBtn = document.getElementById('historyBtn');
    const accountBtn = document.getElementById('accountBtn');

    if (homeBtn) homeBtn.addEventListener('click', () => switchScreen('main'));
    if (historyBtn) historyBtn.addEventListener('click', () => switchScreen('history'));
    if (accountBtn) accountBtn.addEventListener('click', () => switchScreen('account'));

    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) logoutBtn.addEventListener('click', logout);

    // Update session time every second
    setInterval(updateSessionTime, 1000);

    // Load saved history
    if (typeof loadHistory === 'function') {
        loadHistory();
    }
});

// Attach nav button listeners immediately (in case DOMContentLoaded already fired)
(function() {
    const homeBtn = document.getElementById('homeBtn');
    const historyBtn = document.getElementById('historyBtn');
    const accountBtn = document.getElementById('accountBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    if (homeBtn) homeBtn.addEventListener('click', () => switchScreen('main'));
    if (historyBtn) historyBtn.addEventListener('click', () => switchScreen('history'));
    if (accountBtn) accountBtn.addEventListener('click', () => switchScreen('account'));
    if (logoutBtn) logoutBtn.addEventListener('click', logout);
})();

// ===== TEXT-TO-SPEECH FUNCTIONS =====
function speakText(text, onStart, onEnd) {
    if (!('speechSynthesis' in window)) {
        alert('Text-to-Speech non supportato nel tuo browser');
        return;
    }

    // Stop any current speech
    if (state.isSpeaking) {
        window.speechSynthesis.cancel();
        state.isSpeaking = false;
        if (onEnd) onEnd();
        return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'it-IT';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => {
        state.isSpeaking = true;
        if (onStart) onStart();
    };

    utterance.onend = () => {
        state.isSpeaking = false;
        if (onEnd) onEnd();
    };

    utterance.onerror = () => {
        state.isSpeaking = false;
        if (onEnd) onEnd();
    };

    state.speechUtterance = utterance;
    window.speechSynthesis.speak(utterance);
}

// ===== DETAIL MODAL FUNCTIONS =====
const detailModal = document.getElementById('detailModal');
const detailClose = document.getElementById('detailClose');
const detailTitle = document.getElementById('detailTitle');
const detailText = document.getElementById('detailText');

if (detailClose) {
    detailClose.addEventListener('click', () => {
        if (detailModal) detailModal.classList.remove('show');
    });
}

if (detailModal) {
    detailModal.addEventListener('click', (e) => {
        if (e.target === detailModal) {
            detailModal.classList.remove('show');
        }
    });
}

function showDetail(field, title) {
    const data = state.analysisResults;
    const details = {
        title: {
            label: '🎨 Titolo del Dipinto',
            text: `"${data.title}" è il titolo di questo capolavoro. Ogni titolo racconta una storia e può rivelare l'intenzione dell'artista nel creare l'opera. Il nome spesso sintetizza il tema principale e l'emozione che l'artista voleva trasmettere.`
        },
        artist: {
            label: '👨‍🎨 Artista',
            text: `${data.artist} è l'artista che ha creato questa meravigliosa opera. La sua biografia, il suo stile unico e il contesto storico in cui ha lavorato sono fondamentali per comprendere profondamente l'opera. Gli artisti lasciano la loro impronta personale in ogni elemento della composizione.`
        },
        year: {
            label: '📅 Periodo Storico',
            text: `Questo dipinto è stato creato nel ${data.year}. Il periodo storico è cruciale per capire il contesto culturale, politico e artistico in cui l'opera è stata creata. Ogni era ha portato con sé movimenti artistici unici e innovazioni tecniche.`
        },
        style: {
            label: '🎭 Movimento Artistico',
            text: `Questo capolavoro appartiene al movimento artistico del ${data.style}. Questo movimento ha definito un'intera epoca dell'arte, con caratteristiche tecniche, tematiche e filosofiche ben precise. Comprendere il movimento aiuta a riconoscere i pattern e le innovazioni dell'epoca.`
        },
        location: {
            label: '🏛️ Ubicazione',
            text: `Questo dipinto si trova ${data.location}. La posizione storica di un'opera d'arte è importante perché testimonia il suo valore, la sua importanza culturale e il percorso che ha fatto attraverso i secoli fino ai giorni nostri.`
        },
        materials: {
            label: '🎨 Materiali e Tecniche',
            text: `I materiali utilizzati sono ${data.materials}. La scelta dei materiali è fondamentale per la durabilità dell'opera e per l'effetto visivo desiderato. Ogni artista sceglie i propri materiali in base alla tecnica e agli effetti che vuole ottenere.`
        },
        color_palette: {
            label: '🌈 Tavolozza Cromatica',
            text: `I colori predominanti sono ${data.color_palette}. L'uso sapiente dei colori crea armonia, contrasto e profondità nell'opera. I colori non sono casuali: ogni tonalità contribuisce all'emozione e al messaggio che l'artista vuole comunicare.`
        }
    };

    if (details[field]) {
        detailTitle.textContent = details[field].label;
        detailText.textContent = details[field].text;
        detailModal.classList.add('show');
    }
}

// ===== CODE VISIBILITY TOGGLE =====
function toggleCodeVisibility() {
    const accountCodeDisplay = document.getElementById('accountCodeDisplay');

    if (accountCodeDisplay.textContent === '••••••••') {
        accountCodeDisplay.textContent = state.accessCode;
    } else {
        accountCodeDisplay.textContent = '••••••••';
    }
}

console.log('🎨 ArtVision AI - Ready!');
