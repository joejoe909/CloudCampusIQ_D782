const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');
const { connect } = require('http2');
require('dotenv').config();

const app = express();
connectDB();

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

app.use((err, req, res, next) =>{ 
    console.error(err.stack);
    res.stats(500).json({ error: 'error in server/server.js'})
})