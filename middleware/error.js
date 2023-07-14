// Function to handle validation errors
const handleValidationError = (err, res) => {
  // Extract the error messages from the 'err' object
  let errors = [];
  for (let field in err.errors) {
    if (err.errors.hasOwnProperty(field)) {
      errors.push(err.errors[field].message);
    }
  }

  // If there are multiple errors, join them with ' || ' separator and send as response
  if (errors.length > 1) {
    const errorMsg = errors.join(" || ");
    res.status(400).send({ messages: errorMsg });
  } else {
    // If there is a single error, send it as response
    res.status(400).send({ messages: errors });
  }
};

// Middleware to handle different types of errors
const typeError = (err, req, res, next) => {
  // Check if the error is a Mongoose validation error
  if (err.name === "ValidationError") {
    // If it is a validation error, call 'handleValidationError' function to handle the error
    handleValidationError(err, res);
  } else {
    // If it is any other type of error, send a generic error message as response
    res.status(500).send({ msg: "Something went wrong", err });
  }
};

// Export the 'typeError' middleware
module.exports = { typeError };
