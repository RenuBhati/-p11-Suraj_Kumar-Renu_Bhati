const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const { dbConfig, serverConfig } = require('./config'); 


const app = express();
const port = serverConfig.port;

// Database connection pool
const pool = new Pool({
    host: dbConfig.host,
    database: dbConfig.database,
    port: dbConfig.port,
});

app.use(bodyParser.json());

// Get all assets for a specific user
app.get('/api/users/:userId/assets', async (req, res) => {
    const { userId } = req.params;

    try {
        const result = await pool.query('SELECT * FROM assets WHERE userId = $1', [userId]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add new asset for a specific user
app.post('/api/users/:userId/assets', async (req, res) => {
    const { userId } = req.params;
    const { assettype, assetvalue, assetname, purchasedate } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO assets (userId, assetType, assetValue, assetName, purchaseDate) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [userId, assettype, assetvalue, assetname, purchasedate]
        );
        res.json(result.rows[0]);
        
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update an existing asset for a specific user
app.put('/api/users/:userId/assets/:assetId', async (req, res) => {
    const { userId, assetId } = req.params;
    const { assettype, assetvalue, assetname, purchasedate } = req.body;

    try {
        const result = await pool.query(
            'UPDATE assets SET assetType = $1, assetValue = $2, assetName = $3, purchaseDate = $4 WHERE userId = $5 AND assetId = $6 RETURNING *',
            [assettype, assetvalue, assetname, purchasedate, userId, assetId]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete an asset for a specific user
app.delete('/api/users/:userId/assets/:assetId', async (req, res) => {
    const { userId, assetId } = req.params;

    try {
        await pool.query('DELETE FROM assets WHERE userId = $1 AND assetId = $2', [userId, assetId]);
        res.json({ message: 'Asset deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

