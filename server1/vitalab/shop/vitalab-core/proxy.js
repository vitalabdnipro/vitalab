const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// Define a route to proxy the request
app.post('/proxy', async (req, res) => {
  try {
    const { data, signature } = req.body;
    const payload = { data, signature };

    // Make the request to the external API
    const response = await axios.post('https://www.liqpay.ua/api/request', payload);

    // Return the API response as-is
    res.send(response.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});