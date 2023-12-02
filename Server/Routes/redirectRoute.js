const express = require('express');
const router = express.Router();
const sql = require('../DB/db');

router.get('/:short_id', async (req, res) => {
    try {
        // Get the short URL from the request parameters
        const { short_id } = req.params;
        // Get the long URL from the database using the short URL
        const result = await sql.query(
            `SELECT long_url FROM url WHERE short_id = $1`,
            [short_id]
        );
        // If the long URL is found, redirect to it
        if (result.rows.length > 0) {
            return res.redirect(result.rows[0].long_url);
        } else {
            res.status(404).json({ error: 'URL not found' });
        }
    } catch (error) {
        console.error('Redirection error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    };
});

module.exports = router;