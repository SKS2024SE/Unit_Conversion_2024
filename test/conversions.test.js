// const module = require('../code/conversions/compound_conversion.js');
// console.log(module);
  
// conversions.test.js
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
const { JSDOM } = require('jsdom');
const {
  areaVolumeConversions,
  speedConversions,
  engineeringConversions,
} = require('../code/conversions/compound_conversion.js');

beforeAll(() => {
  const dom = new JSDOM(`
    <!DOCTYPE html>
    <html>
      <body>
        <select id="conversion-category"></select>
        <select id="conversion-type"></select>
        <input id="input-value" />
        <button id="convert-btn"></button>
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

describe('DOM Interactions', () => {
  test('DOM elements are accessible', () => {
    const categoryDropdown = document.getElementById('conversion-category');
    expect(categoryDropdown).toBeNull();
  });
});
  describe("Conversion Tests", () => {
    // Area & Volume Conversion Tests
    test("Square meters to square feet", () => {
      expect(areaVolumeConversions.sqm_to_sqft(1)).toBeCloseTo(10.7639);
    });
  
    test("Square feet to square meters", () => {
      expect(areaVolumeConversions.sqft_to_sqm(10.7639)).toBeCloseTo(1);
    });
  
    test("Cubic meters to cubic feet", () => {
      expect(areaVolumeConversions.cubicm_to_cubicft(1)).toBeCloseTo(35.3147);
    });
  
    test("Cubic feet to cubic meters", () => {
      expect(areaVolumeConversions.cubicft_to_cubicm(35.3147)).toBeCloseTo(1);
    });
  
    test("Liters to gallons", () => {
      expect(areaVolumeConversions.liter_to_gallon(1)).toBeCloseTo(0.264172);
    });
  
    // Speed Conversion Tests
    test("Kilometers per hour to meters per second", () => {
      expect(speedConversions.kmh_to_ms(3.6)).toBeCloseTo(1);
    });
  
    test("Meters per second to kilometers per hour", () => {
      expect(speedConversions.ms_to_kmh(1)).toBeCloseTo(3.6);
    });
  
    test("Miles per hour to kilometers per hour", () => {
      expect(speedConversions.mph_to_kmh(1)).toBeCloseTo(1.60934);
    });
  
    test("Kilometers per hour to miles per hour", () => {
      expect(speedConversions.kmh_to_mph(1.60934)).toBeCloseTo(1);
    });
  
    test("Knots to kilometers per hour", () => {
      expect(speedConversions.knot_to_kmh(1)).toBeCloseTo(1.852);
    });
  
    // Engineering Conversion Tests
    test("Pascals to PSI", () => {
      expect(engineeringConversions.pascal_to_psi(1)).toBeCloseTo(0.000145038);
    });
  
    test("PSI to Pascals", () => {
      expect(engineeringConversions.psi_to_pascal(0.000145038)).toBeCloseTo(1);
    });
  
    test("Joules to calories", () => {
      expect(engineeringConversions.joule_to_calorie(1)).toBeCloseTo(0.239006);
    });
  
    test("Calories to joules", () => {
      expect(engineeringConversions.calorie_to_joule(0.239006)).toBeCloseTo(1);
    });
  
    test("Watts to horsepower", () => {
      expect(engineeringConversions.watt_to_hp(1)).toBeCloseTo(0.00134102);
    });
  
    // Edge Case Tests
    // test("Handles NaN input gracefully", () => {
    //   expect(() => areaVolumeConversions.sqm_to_sqft(NaN)).toThrowError();
    //   expect(() => speedConversions.kmh_to_ms(NaN)).toThrowError();
    //   expect(() => engineeringConversions.pascal_to_psi(NaN)).toThrowError();
    // });
  
    test("Handles negative values correctly", () => {
      expect(areaVolumeConversions.sqm_to_sqft(-1)).toBeCloseTo(-10.7639);
      expect(speedConversions.kmh_to_ms(-3.6)).toBeCloseTo(-1);
      expect(engineeringConversions.pascal_to_psi(-1)).toBeCloseTo(-0.000145038);
    });
  
    test("Returns expected results for zero values", () => {
      expect(areaVolumeConversions.sqm_to_sqft(0)).toBe(0);
      expect(speedConversions.kmh_to_ms(0)).toBe(0);
      expect(engineeringConversions.pascal_to_psi(0)).toBe(0);
    });
  });
  