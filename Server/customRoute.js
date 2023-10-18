const express = require('express');
const router = express.Router();
const pool = require('./db');

router.get('/:custom_url', async (req, res) => {
    const { custom_url } = req.params;
    try {
        const custom = await pool.query(
            `SELECT long_url FROM url WHERE custom_url = $1`,
            [custom_url]
        );
        if (custom.rows.length > 0) {
            return res.redirect(custom.rows[0].long_url);
        } else {
            res.status(404).json({ error: 'URL not found' });
        }
    } catch (error) {
        console.error('Custom URL handling error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;