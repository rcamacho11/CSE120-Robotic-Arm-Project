const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(__dirname));

app.post('/save', (req, res) => {
    const points = req.body; // Receive the entire array of points

    if (!Array.isArray(points)) {
        return res.status(400).send('Invalid data format. Expected an array of points.');
    }

    const data = points.map(point => `X: ${point.x}, Y: ${point.y}, Z: ${point.z}`).join('\n');

    fs.writeFile('coordinates.txt', data, (err) => {
        if (err) {
            console.error('Failed to save coordinates:', err);
            res.status(500).send('Failed to save');
        } else {
            console.log('Coordinates saved (rewritten):', data);
            res.status(200).send('Saved successfully');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
