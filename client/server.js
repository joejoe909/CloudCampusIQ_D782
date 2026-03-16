import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.join(__dirname, 'dist');

app.use(express.static(distPath));

app.get(origin: process.env.CLIENT_ORIGIN, (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});

const port = process.env.PORT || 8080;

app.listen(port, ()=> {
    console.log(`Frontend server msg on port ${port}`);
});

app.use((err, req, res, next) =>{ 
    console.error(err.stack);
    res.stats(500).json({ error: 'error in clinet/server.js'})
})