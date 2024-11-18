// document.getElementById('convert-btn').addEventListener('click', () => {
//     const type = document.getElementById('conversion-type').value;
//     const value = parseFloat(document.getElementById('input-value').value);
//     const resultElement = document.getElementById('result');
  
//     if (isNaN(value)) {
//       resultElement.textContent = "Please enter a valid number.";
//       return;
//     }
  
//     let result;
//     switch (type) {
//       case 'kmh_to_ms':
//         result = `${value} km/h = ${(value / 3.6).toFixed(3)} m/s`;
//         break;
//       case 'ms_to_kmh':
//         result = `${value} m/s = ${(value * 3.6).toFixed(3)} km/h`;
//         break;
//       case 'f_to_c':
//         result = `${value}°F = ${((value - 32) * 5 / 9).toFixed(2)}°C`;
//         break;
//       case 'c_to_f':
//         result = `${value}°C = ${(value * 9 / 5 + 32).toFixed(2)}°F`;
//         break;
//       case 'mph_to_kmh':
//         result = `${value} mph = ${(value * 1.60934).toFixed(3)} km/h`;
//         break;
//       default:
//         result = "Invalid conversion type.";
//     }
  
//     resultElement.textContent = result;
//   });

// Area & Volume Conversions
// Conversion data
const areaVolumeConversions = {
    "sqm_to_sqft": (value) => value * 10.7639,
    "sqft_to_sqm": (value) => value / 10.7639,
    "cubicm_to_cubicft": (value) => value * 35.3147,
    "cubicft_to_cubicm": (value) => value / 35.3147,
    "liter_to_gallon": (value) => value * 0.264172,
  };
  
  const speedConversions = {
    "kmh_to_ms": (value) => value / 3.6,
    "ms_to_kmh": (value) => value * 3.6,
    "mph_to_kmh": (value) => value * 1.60934,
    "kmh_to_mph": (value) => value / 1.60934,
    "knot_to_kmh": (value) => value * 1.852,
  };
  
  const engineeringConversions = {
    "pascal_to_psi": (value) => value * 0.000145038,
    "psi_to_pascal": (value) => value / 0.000145038,
    "joule_to_calorie": (value) => value * 0.239006,
    "calorie_to_joule": (value) => value / 0.239006,
    "watt_to_hp": (value) => value * 0.00134102,
  };
  
  const conversionMap = {
    areaVolume: areaVolumeConversions,
    speed: speedConversions,
    engineering: engineeringConversions,
  };
  
  const conversionOptions = {
    areaVolume: {
      "sqm_to_sqft": "Square Meters to Square Feet",
      "sqft_to_sqm": "Square Feet to Square Meters",
      "cubicm_to_cubicft": "Cubic Meters to Cubic Feet",
      "cubicft_to_cubicm": "Cubic Feet to Cubic Meters",
      "liter_to_gallon": "Liters to Gallons",
    },
    speed: {
      "kmh_to_ms": "Kilometers per Hour to Meters per Second",
      "ms_to_kmh": "Meters per Second to Kilometers per Hour",
      "mph_to_kmh": "Miles per Hour to Kilometers per Hour",
      "kmh_to_mph": "Kilometers per Hour to Miles per Hour",
      "knot_to_kmh": "Knots to Kilometers per Hour",
    },
    engineering: {
      "pascal_to_psi": "Pascals to PSI",
      "psi_to_pascal": "PSI to Pascals",
      "joule_to_calorie": "Joules to Calories",
      "calorie_to_joule": "Calories to Joules",
      "watt_to_hp": "Watts to Horsepower",
    },
  };
  
  document.addEventListener("DOMContentLoaded", () => {
    const categoryDropdown = document.getElementById("conversion-category");
    const typeDropdown = document.getElementById("conversion-type");
  
    // Populate the conversion type dropdown when the category changes
    function updateConversionTypes() {
      const category = categoryDropdown.value;
      const options = conversionOptions[category];
      typeDropdown.innerHTML = ""; // Clear existing options
  
      for (const [key, label] of Object.entries(options)) {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = label;
        typeDropdown.appendChild(option);
      }
    }
  
    // Perform conversion
    function performConversion() {
      const category = document.getElementById("conversion-category").value;
      const type = document.getElementById("conversion-type").value;
      const value = parseFloat(document.getElementById("input-value").value);
  
      if (isNaN(value)) {
        document.getElementById("result").textContent = "Please enter a valid number.";
        return;
      }
  
      const conversionFunc = conversionMap[category][type];
      const result = conversionFunc(value);
      document.getElementById("result").textContent = `${result.toFixed(4)}`;
    }
  
    // Event listener for category dropdown
    categoryDropdown.addEventListener("change", updateConversionTypes);
  
    // Event listener for convert button
    document.getElementById("convert-btn").addEventListener("click", performConversion);
  
    // Initialize the conversion type dropdown on page load
    updateConversionTypes();
  });