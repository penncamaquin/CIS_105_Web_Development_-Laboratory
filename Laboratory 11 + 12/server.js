const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Proxy endpoint for Pokemon data
app.get('/api/pokemon/:pokemon', async (req, res) => {
  const { pokemon } = req.params;

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Pokemon not found' });
    }

    const data = await response.json();

    // Send only the fields the frontend actually needs
    res.json({
      id: data.id,
      name: data.name,
      height: data.height,
      weight: data.weight,
      types: data.types,
      abilities: data.abilities,
    });

  } catch (error) {
    console.error('Error fetching from PokeAPI:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Pokedecss server running at http://localhost:${PORT}`);
});
