const express = require('express');
const request = require('supertest');
const app = express();
const urlRoute = require('../Routes/urlRoute');
const redirectRoute = require('../Routes/redirectRoute');
const customRoute = require('../Routes/customRoute');
require('dotenv').config();
// Import your database connection here, e.g., your pool from ../DB/db
const baseURL = process.env.BACKEND_URL;

jest.mock('../DB/db', () => ({
  pool: {
    connect: jest.fn()
  }
}));

app.use('/url', urlRoute);
app.use('/', redirectRoute);
app.use('/', customRoute);

describe('Long URL', () => {
  it('should shorten a URL', async () => {
    const mockURL = {
      long_url: 'https://www.google.com',
      short_url: `${baseURL}/:/${expect.any(String)}`,
      custom_url: null,
      short_id: 'ahdfrtvx'
    };

    const dbInstance = {
      query: jest.fn().mockResolvedValue({ rows: [mockURL] })
    };
    
    // Mock the database connection
    const pool = require('../DB/db');
    pool.pool.connect.mockImplementation(() => dbInstance);

    // Send a POST request to your API
    const res = await request(app)
      .post('/url')
      .send({
        long_url: 'https://www.google.com' // Use "long_url" instead of "longUrl"
      });

    // Verify the response
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockURL); // Check the response body

    // Check if the query function was called with the expected SQL
    expect(dbInstance.query).toHaveBeenCalledWith(
      'INSERT INTO url (long_url, short_url, custom_url, short_id) VALUES ($1, $2, $3, $4) RETURNING short_url',
      ['https://www.google.com', expect.any(String), null, expect.any(String)] // Modify as needed
    );
  });
});
