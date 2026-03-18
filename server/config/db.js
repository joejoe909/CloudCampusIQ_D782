const mongoose = require('mongoose');

const connectDB = async() => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI, { 
            tls: true,
            tlsAllowInvalidCertificates: false
        });
        console.log(`MongoDb connected: ${conn.connection.host}`);
    }catch(err){
        console.error('Database connection error db.js',err);
        process.exit(1);
    }
};

module.exports = connectDB;
