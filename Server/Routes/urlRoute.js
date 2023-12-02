const express = require('express');
const router = express.Router();
const sql = require('../DB/db');
const validUrl = require('valid-url');
require('dotenv').config();

const baseURL = process.env.BACKEND_URL;

router.post('/', async (req, res) => {
    try {
        // Get the long URL and custom URL from the request body
        const { long_url, custom_url } = req.body;
        const { nanoid } = await import('nanoid'); // Import nanoid dynamically because it is an ESM module
        let short_url;
        let short_id = nanoid(8);
        // Check if the long URL is valid
        if (validUrl.isUri(long_url)) {
            console.log('Valid long URL');
          } else {
            res.status(400).json({ error: 'Invalid long URL' });
          };
          // Check if the long URL exceeds 2000 characters
        if (long_url.length > 2000) {
            return res.status(400).json({ error: 'URL cannot exceed 2000 characters' });
        };
        // Check if the custom URL exceeds 100 characters
        if (custom_url && custom_url.length > 200) {
            return res.status(400).json({ error: 'Custom URL cannot exceed 200 characters' });
        };
        // Check if the custom URL is already in use
        if (custom_url) {
            const existingUrl = await sql`SELECT short_url FROM url WHERE custom_url = ${custom_url}`;
            if (existingUrl && existingUrl.length > 0) {
                return res.status(400).json({ error: 'Custom URL already in use' });
            }
            // Use the custom URL as the short URL
            short_url = `${baseURL}/:/${custom_url}`;
        } else {
            // Generate a short URL using nanoid
            short_url = `${baseURL}/${short_id}`;
        };
        // Insert the URL into the database
        const newUrl = await sql`INSERT INTO url (long_url, short_url, custom_url, short_id) VALUES (${long_url}, ${short_url}, ${custom_url}, ${short_id}) RETURNING *`;
        if (newUrl && newUrl.length > 0) {
            res.json(newUrl[0]);
        } else {
            res.status(500).json({ error: 'URL insertion failed' });
        }
    } catch (error) {
        console.error('URL insertion error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    };
});

module.exports = router;