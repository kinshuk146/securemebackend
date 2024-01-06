import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './mongodb/connect.js';
import passwordRoute from './routes/passwordRoute.js';
import fileRoute from './routes/fileRoute.js'
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use('/password', passwordRoute);
app.use('/file', fileRoute);


app.get('/', async (req, res) => {
    res.send('Hello');
})

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL)
        app.listen(8080, () => {
            console.log('Server Started');
        })
    }
    catch (error) {
        console.log(error);
    }
}

startServer();