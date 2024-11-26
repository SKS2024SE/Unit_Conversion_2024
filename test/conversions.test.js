const { JSDOM } = require('jsdom');
const { window } = new JSDOM('');
global.document = window.document;
global.window = window;
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const {
  areaVolumeConversions,
  speedConversions,
  engineeringConversions,
} = require('../code/conversions/compound_conversion.js');

// Set up DOM elements before all tests
before(() => {
  const dom = new JSDOM(`
    <!DOCTYPE html>
    <html>
      <body>
        <select id="conversion-category"></select>
        <select id="conversion-type"></select>
        <input id="input-value" />
        <div id="result"></div>
      </body>
    </html>
  `);
  global.document = dom.window.document;
  global.window = dom.window;

  // Trigger DOMContentLoaded for the script
  const event = new dom.window.Event('DOMContentLoaded');
  dom.window.document.dispatchEvent(event);
});

const { expect } = require('chai');

describe("Conversion Tests", () => {
  // **1-5: Area & Volume Conversion Tests**
  it("Square meters to square feet", () => {
    expect(areaVolumeConversions.sqm_to_sqft(1)).to.be.closeTo(10.7639, 0.0001);
  });

  it("Square feet to square meters", () => {
    expect(areaVolumeConversions.sqft_to_sqm(10.7639)).to.be.closeTo(1, 0.0001);
  });

  it("Cubic meters to cubic feet", () => {
    expect(areaVolumeConversions.cubicm_to_cubicft(1)).to.be.closeTo(35.3147, 0.0001);
  });

  it("Cubic feet to cubic meters", () => {
    expect(areaVolumeConversions.cubicft_to_cubicm(35.3147)).to.be.closeTo(1, 0.0001);
  });

  it("Liters to gallons", () => {
    expect(areaVolumeConversions.liter_to_gallon(1)).to.be.closeTo(0.264172, 0.0001);
  });

  // **6-10: Speed Conversion Tests**
  it("Kilometers per hour to meters per second", () => {
    expect(speedConversions.kmh_to_ms(3.6)).to.be.closeTo(1, 0.0001);
  });

  it("Meters per second to kilometers per hour", () => {
    expect(speedConversions.ms_to_kmh(1)).to.be.closeTo(3.6, 0.0001);
  });

  it("Miles per hour to kilometers per hour", () => {
    expect(speedConversions.mph_to_kmh(1)).to.be.closeTo(1.60934, 0.0001);
  });

  it("Kilometers per hour to miles per hour", () => {
    expect(speedConversions.kmh_to_mph(1.60934)).to.be.closeTo(1, 0.0001);
  });

  it("Knots to kilometers per hour", () => {
    expect(speedConversions.knot_to_kmh(1)).to.be.closeTo(1.852, 0.0001);
  });

  // **11-15: Engineering Conversion Tests**
  it("Pascals to PSI", () => {
    expect(engineeringConversions.pascal_to_psi(1)).to.be.closeTo(0.000145038, 0.0001);
  });

  it("PSI to Pascals", () => {
    expect(engineeringConversions.psi_to_pascal(0.000145038)).to.be.closeTo(1, 0.0001);
  });

  it("Joules to calories", () => {
    expect(engineeringConversions.joule_to_calorie(1)).to.be.closeTo(0.239006, 0.0001);
  });

  it("Calories to joules", () => {
    expect(engineeringConversions.calorie_to_joule(0.239006)).to.be.closeTo(1, 0.0001);
  });

  it("Watts to horsepower", () => {
    expect(engineeringConversions.watt_to_hp(1)).to.be.closeTo(0.00134102, 0.0001);
  });

  // **16-20: Edge Case Tests**
  it("Handles negative values correctly", () => {
    expect(areaVolumeConversions.sqm_to_sqft(-1)).to.be.closeTo(-10.7639, 0.0001);
    expect(speedConversions.kmh_to_ms(-3.6)).to.be.closeTo(-1, 0.0001);
    expect(engineeringConversions.pascal_to_psi(-1)).to.be.closeTo(-0.000145038, 0.0001);
  });

  it("Returns expected results for zero values", () => {
    expect(areaVolumeConversions.sqm_to_sqft(0)).to.be.equal(0);
    expect(speedConversions.kmh_to_ms(0)).to.be.equal(0);
    expect(engineeringConversions.pascal_to_psi(0)).to.be.equal(0);
  });

  it("Returns NaN for invalid inputs", () => {
    expect(areaVolumeConversions.sqm_to_sqft(NaN)).to.be.NaN;
    expect(speedConversions.kmh_to_ms(NaN)).to.be.NaN;
    expect(engineeringConversions.pascal_to_psi(NaN)).to.be.NaN;
  });

  it("Handles very large values", () => {
    expect(areaVolumeConversions.sqm_to_sqft(1e12)).to.be.closeTo(1.07639e13, 1e8);
    expect(speedConversions.kmh_to_ms(1e6)).to.be.closeTo(277777.78, 1e2);
    expect(engineeringConversions.pascal_to_psi(1e9)).to.be.closeTo(145038, 1e2);
  });

  // it("Handles very small values", () => {
  //   expect(areaVolumeConversions.sqm_to_sqft(1e-12)).to.be.closeTo(1.07639e-11, 1e-15);
  //   expect(speedConversions.kmh_to_ms(1e-6)).to.be.closeTo(2.77778e-7, 1e-10);
  //   expect(engineeringConversions.pascal_to_psi(1e-9)).to.be.closeTo(1.45038e-10, 1e-12);
  // });
});
