const GOOGLE_MAPS_API_KEY = 'AIzaSyBLUr1xYVTpv-2hwmnZ1ZN7hturBg0yuHE';

function getAddress(latitude, longitude, callback) {
  let url =  `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log('DATA', data)
      return data.results[0].formatted_address
    })
    .then(address => callback(address.substring(0, address.indexOf(', '))))
    .catch(err => console.log('error', err))
}

function getUserLocation(callback) {
  navigator.geolocation.getCurrentPosition(
    position => callback(position.coords),
    e => {
      callback({latitude: 37.0902, longitude: -95.7129}); // center of USA
      console.log('getUserLocation error', e)
    },
    { enableHighAccuracy: true }
  );
}

export {
  getUserLocation,
  getAddress
};
