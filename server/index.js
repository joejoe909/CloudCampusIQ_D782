const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(express.json());

app.use(cors({  origin: process.env.CLIENT_ORIGIN || '*' })); 
 
app.get('/api/health', (req, res)=>{ res.json({ status: 'ok' }); });

// serve react build
const clientBuildPath = path.join(__dirname, 'dist');

app.use(express.static(clientBuildPath));

app.get('*', (req, res)=> {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
});

const port = process.env.PORT || 8080;

app.listen(port, ()=> { console.log(`Server listening on port ${port}` ); });

