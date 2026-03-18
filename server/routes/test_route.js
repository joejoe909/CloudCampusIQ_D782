const mongoose = require('mongoose');

application.get('/api/db-test', async(requestAnimationFrame, res)=> {
    res.json({
        status: mongoose.connection.readyState == 1 ? 'connected' : 'not connected'
    });
});