const express = require('express');
const router = express.Router();
const pool = require('../DB/db');

router.get('/:/:custom_url', async (req, res) => {
    try {
        const { custom_url } = req.params;
        const result = await pool.query(
            `SELECT long_url FROM url WHERE custom_url = $1`,
            [custom_url]
        );
        if (result.rows.length > 0) {
            return res.redirect(result.rows[0].long_url);
        } else {
            res.status(404).json({ error: 'URL not found' });
        }
    } catch (error) {
        console.error('Custom URL handling error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;