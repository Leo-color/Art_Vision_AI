// Gallery of Famous Paintings from Unsplash
const paintingsLibrary = [
    {
        id: 1,
        url: 'https://images.unsplash.com/photo-1502933691298-84fc14542831?w=500&h=500&fit=crop',
        thumb: 'https://images.unsplash.com/photo-1502933691298-84fc14542831?w=100&h=100&fit=crop',
        title: 'Abstract Art',
        artist: 'Modern Artist'
    },
    {
        id: 2,
        url: 'https://images.unsplash.com/photo-1549887534-f81da9ffbd35?w=500&h=500&fit=crop',
        thumb: 'https://images.unsplash.com/photo-1549887534-f81da9ffbd35?w=100&h=100&fit=crop',
        title: 'Colorful Expression',
        artist: 'Contemporary'
    },
    {
        id: 3,
        url: 'https://images.unsplash.com/photo-1578926078328-e1b737b5edf6?w=500&h=500&fit=crop',
        thumb: 'https://images.unsplash.com/photo-1578926078328-e1b737b5edf6?w=100&h=100&fit=crop',
        title: 'Canvas Masterpiece',
        artist: 'Gallery'
    },
    {
        id: 4,
        url: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=500&h=500&fit=crop',
        thumb: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=100&h=100&fit=crop',
        title: 'Floral Art',
        artist: 'Nature Inspired'
    },
    {
        id: 5,
        url: 'https://images.unsplash.com/photo-1577720643272-265f434bd276?w=500&h=500&fit=crop',
        thumb: 'https://images.unsplash.com/photo-1577720643272-265f434bd276?w=100&h=100&fit=crop',
        title: 'Modern Design',
        artist: 'Digital Art'
    },
    {
        id: 6,
        url: 'https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=500&h=500&fit=crop',
        thumb: 'https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=100&h=100&fit=crop',
        title: 'Street Style',
        artist: 'Urban Artist'
    }
];

// Get random painting
function getRandomPainting() {
    return paintingsLibrary[Math.floor(Math.random() * paintingsLibrary.length)];
}

// Get painting by ID
function getPaintingById(id) {
    return paintingsLibrary.find(p => p.id === id);
}
