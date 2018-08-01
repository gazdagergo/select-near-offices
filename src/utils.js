// https://www.geodatasource.com/developers/javascript
function distance(lat1, lon1, lat2, lon2, unit) {
  var radlat1 = (Math.PI * lat1) / 180;
  var radlat2 = (Math.PI * lat2) / 180;
  var theta = lon1 - lon2;
  var radtheta = (Math.PI * theta) / 180;
  var dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit === "K") {
    dist = dist * 1.609344;
  }
  if (unit === "N") {
    dist = dist * 0.8684;
  }
  return dist;
}

function isWithinRange(place1, place2, range) {
  var lat1 = place1[0];
  var lon1 = place1[1];
  var lat2 = place2[0];
  var lon2 = place2[1];
  return distance(lat1, lon1, lat2, lon2, "K") < range;
}

function orderCollectionByKey(coll, key) {
  return coll.sort((a, b) => {
    return a[key] > b[key];
  });
}

exports.isWithinRange = isWithinRange;
exports.orderCollectionByKey = orderCollectionByKey;
