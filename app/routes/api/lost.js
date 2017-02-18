import express from 'express';
import bodyParser from 'body-parser';
import images from '../../util/images';
import config from '../../config/config';

const router = express.Router();

router.use(bodyParser.urlencoded({ extended:false }));

function getModel() {
  return require(`./../../models/model-${config.get('DATA_BACKEND')}`);
}

/*
 * POST /api/lost/
 *
 * Post a lost animal {
 *  id,
 *  name,
 *  breed,
 *  height,
 *  weight,
 *  latlong,
 *  timestamp
 * }
 */
router.post('/add', (req,res,next) => {
  const data = req.body;
  getModel().create(data);
  res.json({"success": true});
});

router.get('/:id', (req, res, next) => {
  // TODO
});

export default router;
