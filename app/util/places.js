import googleplaces from 'googleplaces';
import config from './config';

const gp = new googleplaces(config.GOOGLE_PLACES_API_KEY, config.GOOGLE_PLACES_OUTPUT_FORMAT);

const params = {
  location: [],
  types: "animal shelter"
};

export default function search(lat,lng) {
  params.location = [lat,lng];
  gp.placeSearch(params, (err, res) => {
    if (err) throw err;
    return res.results;
  });
}
