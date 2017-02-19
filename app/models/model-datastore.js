import Datastore from '@google-cloud/datastore';
import config from '../config/config.js';

const ds = Datastore({
  projectId: config.get('GCLOUD_PROJECT')
});

const kind = 'Pet';

/*
 * Datastore format:
 * {
 *  id,
 *  name,
 *  breed,
 *  height,
 *  weight,
 *  latlong,
 *  timestamp
 * }
 */
function fromDataStore(obj) {
  obj.data.id = obj.key.id;
  return obj.data;
}

function toDataStore(obj, nonIndexed) {
  nonIndexed = nonIndexed || [];
  const results = [];
  Object.keys(obj).forEach((k) => {
    if (obj[k] === undefined) return;
    results.push({
      name: k,
      value: obj[k],
      excludeFromIndexes: nonIndexed.indexOf(k) !== -1
    });
  });
  return results;
}

function create(data) {
  const taskKey = ds.key('Lost Pet');
  const entity = {
    key: taskKey,
    data: [
      {
        name: 'user',
        value: data.user
      },
      {
        name: 'title',
        value: data.title
      },
      {
        name: 'sex',
        value: data.sex
      },
      {
        name: 'lost_datetime',
        value: data.lost_datetime
      },
      {
        name: 'pet_name',
        value: data.pet_name
      },
      {
        name: 'pet_breed',
        value: data.pet_breed
      },
      {
        name: 'pet_weight',
        value: data.pet_weight
      },
      {
        name: 'pet_height',
        value: data.pet_height
      },
      {
        name: 'pet_species',
        value: data.pet_species
      },
      {
        name: 'latlong',
        value: {
          "latitude": data.latlong.latitude,
          "longitude": data.latlong.longitude
        }
      }
    ]
  };
  
  return ds.save(entity).then(() => {
    console.log(`Task ${taskKey.id} created successfully.`);
    return taskKey;
  });
}

function read(id, cb) {
  const key = ds.key([kind, parseInt(id,10)]);
  ds.get(key, (err, cb) => {
    if (err) {
      cb(err);
      return;
    }
    if (!entity) {
      cb({
        code: 404,
        message: 'Not found'
      });
      return;
    }
    cb(null, fromDataStore(entity));
  });
}

function update(id,data,cb) {
  let key;
  if (id) {
    key = ds.key([kind, parseInt(id,10)]);
  } else {
    key = ds.key(kind);
  }

  const entity = {
    key: key,
    data: toDataStore(data, ['description'])
  };

  ds.save(
    entity,
    (err) => {
      data.id = entity.key.id;
      cb(err, err ? null : data);
    }
  );
}

function list(limit, cb) {
  const q = ds.createQuery(kind)
    .limit(limit);

    ds.runQuery(q, cb); 
}

module.exports = {
  create,
  read,
  update,
//  delete: _delete,
  list
};
