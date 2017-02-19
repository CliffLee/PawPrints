import Datastore from '@google-cloud/datastore';
import config from '../config/config.js';

const ds = Datastore({
  projectId: config.get('GCLOUD_PROJECT')
});

const kind = 'Lost Pet';

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
  const taskKey = ds.key(kind);
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

function update(petId, updatedPet) {
  const transaction = ds.transaction();
  const petKey = ds.key([
    'Lost Pet',
    petId
  ]);

  return transaction.run()
    .then(() => transaction.get(petKey))
    .then((results) => {
      const pet = results[0];
      for (var field in updatedPet) {
        pet[field] = updatedPet[field];
      }
      transaction.save({
        key: petKey,
        data: pet
      });
      return transaction.commit();
    })
    .then(() => {
      console.log(`Pet ${petId} updated successfully`);
    })
    .catch(() => transaction.rollback());
}

function list(limit) {
  const q = ds.createQuery(kind)
    .limit(limit);

  return new Promise((res,rej) => {
    ds.runQuery(q, (err, entities, info) => {
      if(!!err) {
        rej(err)
      } else {
        res(entities) 
      }
    })
  })
}

module.exports = {
  create,
  read,
  update,
//  delete: _delete,
  list
};
