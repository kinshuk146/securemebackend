import express, { json } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors'
import aesjs from 'aes-js';
import Password from '../mongodb/models/password.js'
dotenv.config();

const router = express.Router();
router.use(cors());

var key = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

const encrypt = (text) => {
    var textBytes = aesjs.utils.utf8.toBytes(text);
    var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    var encryptedBytes = aesCtr.encrypt(textBytes);
    var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
    return encryptedHex;
}

const decrypt = (encryptedHex) => {
    var encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);
    var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    var decryptedBytes = aesCtr.decrypt(encryptedBytes);
    var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
    return decryptedText
}

router.post('/', async (req, res) => {
    var encryptedHex = encrypt(req.body.password)
    const passwordItem = new Password({
        title: req.body.title,
        password: encryptedHex,
        email: req.body.email
    })
    passwordItem.save();
})


router.get('/', async (req, res) => {

    console.log(req.query);
    const query = Password.find({ title: req.query.find, email: req.query.email })
    const passwordObject = await query.exec();
    var decryptedText = decrypt(passwordObject[0].password)
    res.send(decryptedText);
})


router.get('/all', async (req, res) => {
    const query = Password.find({ email: req.query.email });
    const allObject = await query.exec();
    var passwordsObj = [];
    allObject.map((obj) => {
        const Obj = {
            title: obj.title,
            password: decrypt(obj.password)
        }
        passwordsObj.push(Obj);
    })
    res.send(passwordsObj);
})


export default router