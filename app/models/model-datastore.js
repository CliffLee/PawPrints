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
        name: 'sex',
        value: data.sex
      },
      {
        name: 'time',
        value: data['time']
      },
      {
        name: 'name',
        value: data['name']
      },
      {
        name: 'breed',
        value: data.breed
      },
      {
        name: 'weight',
        value: data.weight
      },
      {
        name: 'species',
        value: data.species
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

  return new Promise()ds.runQuery(q, cb); 
}

module.exports = {
  create,
  read,
  update,
//  delete: _delete,
  list
};
