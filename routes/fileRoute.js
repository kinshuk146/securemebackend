import express, { json } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors'
import Image from '../mongodb/models/image.js'
dotenv.config();


const router = express.Router();
router.use(cors());

router.post('/image',(req,res)=>{
  console.log(req.body)
  const image = new Image({
    email:req.body.email,
    image:req.body.data
  });
  image.save();
})

router.get('/image',async (req,res)=>{
  const query=Image.find({email:req.query.email});
  const allObject = await query.exec();
  console.log(allObject);
  res.send(allObject);
})

export default router