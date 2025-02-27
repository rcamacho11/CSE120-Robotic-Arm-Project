const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(__dirname)); // Serve HTML files

app.post('/save', (req, res) => {
    const { x, y, z } = req.body; //add z
    const data = `X: ${x}, Y: ${y}, Z: ${z}\n`; //add z

    fs.appendFile('coordinates.txt', data, (err) => { //change file name
        if (err) {
            console.error('Failed to save coordinates:', err);
            res.status(500).send('Failed to save');
        } else {
            console.log('Coordinates saved:', data);
            res.status(200).send('Saved successfully');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});