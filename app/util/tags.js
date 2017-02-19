var request = require("request");

function getTags(imageURL){
  var options = { method: 'POST',
    url: 'http://api.acusense.ai/api/v1/image/analytics',
    headers:
     {
       authorization: 'NJoIZsX4k=4O3lTYz877w6ltG05p0XqR',
       accept: 'application/json',
       'content-type': 'application/json' },
    body: { image_url: [ imageURL ] },
    json: true };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    return JSON.parse(body.result.images.visual_tags);
  });
}//end of getTags
