const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// In-memory database
let superheroes = [];

// Validation function
const isValidSuperhero = (name, superpower, humilityScore) => {
    return (
        typeof name === 'string' && name.trim() !== '' &&
        typeof superpower === 'string' && superpower.trim() !== '' &&
        typeof humilityScore === 'number' && humilityScore >= 1 && humilityScore <= 10
    );
};

// POST /superheroes - Add a superhero
app.post('/superheroes', (req, res) => {
    const { name, superpower, humilityScore } = req.body;

    if (!isValidSuperhero(name, superpower, humilityScore)) {
        return res.status(400).json({ error: 'Invalid data. Ensure correct name, superpower, and humility score (1-10).' });
    }

    superheroes.push({ name, superpower, humilityScore });
    res.status(201).json({ message: 'Superhero added successfully!' });
});

// GET /superheroes - Fetch superheroes sorted by humilityScore
app.get('/superheroes', (req, res) => {
    const sortedSuperheroes = [...superheroes].sort((a, b) => b.humilityScore - a.humilityScore);
    res.json(sortedSuperheroes);
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

module.exports = app; // Export for testing
