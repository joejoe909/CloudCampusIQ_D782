const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());

app.use(cors({  origin: process.env.CLIENT_ORIGIN || '*' }));

app.get('/api/health', (req, res)=>{ res.json({ status: 'ok' }); });

const port = process.env.PORT || 8080;

app.listen(port, ()=> { console.log(`Server listening on port ${'port'}` ); });

