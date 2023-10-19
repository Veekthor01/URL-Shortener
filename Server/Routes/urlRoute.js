const express = require('express');
const router = express.Router();
const pool = require('../DB/db');
const validUrl = require('valid-url');

const baseURL = 'http://localhost:3000';

router.post('/', async (req, res) => {
    try {
        const { long_url, custom_url } = req.body;
        const { nanoid } = await import('nanoid'); // Import nanoid dynamically because it is an ESM module
        let short_url;
        let short_id = nanoid(8);
        // Check if the base URL is valid
        /*if (validUrl.isUri(baseURL)) {
            console.log('Valid baseUrl');
          } else {
            console.error('Invalid baseUrl');
          } */
        // Check if the long URL is valid
        if (validUrl.isUri(long_url)) {
            console.log('Valid long URL');
          } else {
            res.status(400).json({ error: 'Invalid long URL' });
          }
        // Check if the custom URL is already in use
        if (custom_url) {
            const existingUrl = await pool.query(
                `SELECT short_url FROM url WHERE custom_url = $1`,
                [custom_url]
            );
            if (existingUrl.rows.length > 0) {
                return res.status(400).json({ error: 'Custom URL already in use' });
            }
            // Use the custom URL as the short URL
            short_url = `${baseURL}/custom/${custom_url}`;
        } else {
            // Generate a short URL using nanoid
            short_url = `${baseURL}/${short_id}`;
        }
        // Insert the URL into the database
        const newUrl = await pool.query(
            `INSERT INTO url (long_url, short_url, custom_url, short_id) VALUES ($1, $2, $3, $4) RETURNING short_url`,
            [long_url, short_url, custom_url, short_id]
        );
        res.json(newUrl.rows[0]);
    } catch (error) {
        console.error('URL insertion error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    };
});

module.exports = router;