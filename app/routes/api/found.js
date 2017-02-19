import express from 'express';
import nodemailer from 'nodemailer';
import search from '../../util/places';

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
    secure: false,
    auth: {
      user: 'pawprintmailer@gmail.com',
      pass: 'staypawes0me'
    }
  };
  let transporter = nodemailer.createTransport(smtpConfig)
});

/*
 * POST - /api/found/shelters
 *
 * req.body = {
 *  lat,
 *  lng
 * }
 */
router.post('/shelters', (req,res) => {
  const locations = search(req.body.lat, req.body.lng);
  res.json(locations);
});

export default router;
