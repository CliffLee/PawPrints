import https from 'https'; 
import * as config from './config';

const q1 = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=animal%20shelter&location='
const q2 = '&radius=500&key=AIzaSyCRIsJmzNnQO7P3ZwAd-E7CWXeVTXI8Mf0';

export default function(lat,lng) {
  lat = lat.toString();
  lng = lng.toString();

  let pathstr = q1 + lat + ',' + lng + q2;
  
  return new Promise((res,rej) => {
    https.get(pathstr, (err, data) => {
      if (!!err) {
        rej(err);
      } else {
        res(data);
      }
    });
  });
}
