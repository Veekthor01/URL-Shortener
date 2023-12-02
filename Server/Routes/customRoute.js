const express = require('express');
const router = express.Router();
const sql = require('../DB/db');

router.get('/:/:custom_url', async (req, res) => {
    try {
        // Get the custom URL from the request parameters
        const { custom_url } = req.params;
        // Get the long URL from the database using the custom URL
        const result = await sql`SELECT long_url FROM url WHERE custom_url = ${custom_url}`;
        // If the long URL is found, redirect to it
        if (result && result.length > 0) {
            return res.redirect(result[0].long_url);
        } else {
            res.status(404).json({ error: 'URL not found' });
        }
    } catch (error) {
        console.error('Custom URL handling error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;