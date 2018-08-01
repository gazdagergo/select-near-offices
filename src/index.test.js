var getOrganizationsWithinRange = require("./index");
var contacts = require("./contacts.json");
var london = [51.515419, -0.141099];
var range = 100;
var expected = [
  {
    organization: "Blue Square 360",
    offices: ["St Saviours Wharf, London SE1 2BE"]
  },
  {
    organization: "Gallus Consulting",
    offices: [
      "Newton House, Northampton Science Park, Moulton Park, Kings Park Road, Northampton, NN3 6LG",
      "No1 Royal Exchange, London, EC3V 3DG"
    ]
  }
];

it("should work on test data", () => {
  expect(getOrganizationsWithinRange(contacts, london, range)).toMatchObject(
    expected
  );
});
