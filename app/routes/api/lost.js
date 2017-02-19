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
router.post(
  '/add',
  images.multer.single('image'),
  images.sendUploadToGCS,
  (req,res) => {
    let data = req.body;

    if (req.file && req.file.cloudStoragePublicUrl) {
      data.imageUrl = req.file.cloudStoragePublicUrl
    }

    getModel().create(data)
      .then(res.json({"success": true}));
});

router.get('/nearby', (req, res, next) => {
  getModel().list(6, (err,entities) => {
    if (err) {
      next(err);
      return;
    }
    console.log(JSON.parse(entities));
  });
});

export default router;
