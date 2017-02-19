import express from 'express';

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
  
});

export default router;
