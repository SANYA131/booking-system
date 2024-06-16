module.exports = (err, req, res, next) => {
  return res.status(err.status || err.statusCode || 500).send(err);
};
