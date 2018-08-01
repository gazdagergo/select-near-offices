var Utils = require("./utils");

function getOrganizationsWithinRange(contacts, base, range) {
  var organizationsSelected = [];
  contacts.forEach(contact => {
    var nearOffices = [];
    contact.offices.forEach(office => {
      var coordinates = office.coordinates.split(",");
      if (Utils.isWithinRange(base, coordinates, range)) {
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
  return Utils.orderCollectionByKey(organizationsSelected, "organization");
}

module.exports = getOrganizationsWithinRange;
