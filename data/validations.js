//Function to check for valid string
function validateString(str, varName) {
  if (typeof str != "string") {
    throw {
      response: {
        status: 400,
        statusText: `${varName || "Input parameter"} must be a string.`,
      },
    };
  }
  if (str.trim().length === 0) {
    throw {
      response: {
        status: 400,
        statusText: `${
          varName || "Input parameter"
        } cannot be empty or spaces.`,
      },
    };
  }
  if (!isNaN(Number(str))) {
    throw {
      response: {
        status: 400,
        statusText: `${varName || "Input parameter"} must be a string.`,
      },
    };
  }
}

//Function to check for valid number
function validateNumber(num, varName) {
  if (typeof num != "number") {
    throw {
      response: {
        status: 400,
        statusText: `${varName || "Input parameter"} must be a number.`,
      },
    };
  }
  if (isNaN(num)) {
    throw {
      response: {
        status: 400,
        statusText: `${varName || "Input parameter"} must be a number.`,
      },
    };
  }
}

module.exports = {
  validateString,
  validateNumber,
};
