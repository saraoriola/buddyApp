const handleValidationError = (err, res) => {
  let errors = [];
  for (let field in err.errors) {
    if (err.errors.hasOwnProperty(field)) {
      errors.push(err.errors[field].message);
    }
  }

  if (errors.length > 1) {
    const errorMsg = errors.join(' || ');
    res.status(400).send({ messages: errorMsg });
  } else {
    res.status(400).send({ messages: errors });
  }
};

const typeError = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    handleValidationError(err, res);
  } else {
    res.status(500).send({ msg: 'Something went wrong', err });
  }
};

module.exports = { typeError };
