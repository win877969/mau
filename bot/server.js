const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Endpoint untuk mengecek proxy
app.get('/check-proxy', async (req, res) => {
    const { ip, port } = req.query;
    const proxyUrl = `http://${ip}:${port}`;

    try {
        const startTime = Date.now();
        const response = await axios.get('https://httpbin.org/ip', {
            proxy: {
                host: ip,
                port: parseInt(port, 10),
            },
            timeout: 5000, // 5 detik timeout
        });
        const latency = Date.now() - startTime;

        res.json({
            success: true,
            latency: latency,
            ip: response.data.origin,
        });
    } catch (error) {
        res.json({
            success: false,
            error: error.message,
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
