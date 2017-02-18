import express from 'express';

const router = express.Router();

router.post('/report', (req,res,next) => {
  console.log(req.body);
  res.send(req.body);
});


export default router;
