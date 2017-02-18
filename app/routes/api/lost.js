import express from 'express';

const router = express.Router();

router.post('/report', (req,res,next) => {
  res.send('Hello World');
});

export default router;
