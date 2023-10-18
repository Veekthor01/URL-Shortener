const express = require('express');
const router = express.Router();
const pool = require('./db');

router.get('/:short_id', async (req, res) => {
    try {
        // Get the short URL from the request parameters
        const { short_id } = req.params;
        // Get the long URL from the database using the short URL
        const result = await pool.query(
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

/*router.get('/custom', async (req, res) => {
    // Handle the custom URL with the full base URL
    const { custom_url } = req.query;
    const result = await pool.query(
        `SELECT long_url FROM url WHERE custom_url = $1`,
        [custom_url]
    );
    if (result.rows.length > 0) {
        return res.redirect(result.rows[0].long_url);
    } else {
        res.status(404).json({ error: 'URL not found' });
    };
}); */

module.exports = router;