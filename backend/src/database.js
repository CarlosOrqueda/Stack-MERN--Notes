import mongoose from 'mongoose';

const optionDB = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}

const URI = process.env.MONGODB_URI ? process.env.MONGODB_URI : 'mongodb://localhost/mongodb-test';

async function connect () {
    try {
        await mongoose.connect(URI, optionDB);
        console.log('DB is connected');
    } catch (e) {
        console.log(e);
    }
}

module.exports = connect();