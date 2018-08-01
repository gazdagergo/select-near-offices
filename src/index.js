var contacts = require("./contacts.json");

var london = [51.515419, -0.141099];

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

function getOrganizationsWithinRange(contacts, range) {
  var organizationsSelected = [];
  contacts.forEach(contact => {
    var nearOffices = [];
    contact.offices.forEach(office => {
      var coordinates = office.coordinates.split(",");
      if (isWithinRange(london, coordinates, range)) {
        nearOffices.push(office.address);
      }
    });
    if (nearOffices.length) {
      organizationsSelected.push({
        organization: contact.organization,
        offices: nearOffices
      });
    }
  });
  return organizationsSelected;
}

console.log(getOrganizationsWithinRange(contacts, 100));
