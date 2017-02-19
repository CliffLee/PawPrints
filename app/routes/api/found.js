import express from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import search from '../../util/places';

const router = express.Router();

router.use(bodyParser.urlencoded({ extended:false }));

/*
 * GET /api/found/
 *
 * test function
 */
router.get('/', (req,res,next) => {
  res.send('hello');
});

/*
 * POST /api/found/email/
 */
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
