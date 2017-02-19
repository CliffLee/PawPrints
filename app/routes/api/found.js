import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

/*
 * GET /api/found/
 *
 * returns a list of max 10 nearby lost pets
 */
router.get('/', (req,res,next) => {
  res.send('hello');
});

router.post('/email', (req,res) => {
  let smtpConfig = {
    host: 'smtp.gmail.com',
    port: 587,
    secure: 
  }
  let transporter = nodemailer.createTransport()
});

export default router;
