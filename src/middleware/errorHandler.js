
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.isJoi) {
    return res.status(400).json({ message: 'Validation error', details: err.details });
  }
  return res.status(500).json({ message: 'Internal server error', error: err.message });
};

export default errorHandler;