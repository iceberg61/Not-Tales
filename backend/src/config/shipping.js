// ---------------------------------------------------------------
// SHIPPING PRICES — edit this file to change what customers pay.
// Prices are in Naira. Any state not listed uses DEFAULT_SHIPPING_FEE.
// The state names on the left must match NIGERIAN_STATES below exactly.
// ---------------------------------------------------------------
const SHIPPING_RATES = {
  Kano: 2000,
  "Abuja (FCT)": 3500,
  Lagos: 4500,
};

const DEFAULT_SHIPPING_FEE = 5000;

const NIGERIAN_STATES = [
  "Abia", "Abuja (FCT)", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa",
  "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu",
  "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi",
  "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo",
  "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara",
];

// Turns whatever was sent ("kano", "KANO") into the official spelling,
// or returns null if it isn't a real state.
function resolveState(input) {
  if (!input) return null;
  const wanted = String(input).trim().toLowerCase();
  return NIGERIAN_STATES.find((s) => s.toLowerCase() === wanted) || null;
}

function getShippingFee(state) {
  return SHIPPING_RATES[state] ?? DEFAULT_SHIPPING_FEE;
}

module.exports = {
  SHIPPING_RATES,
  DEFAULT_SHIPPING_FEE,
  NIGERIAN_STATES,
  resolveState,
  getShippingFee,
};
