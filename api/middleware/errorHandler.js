const errorHandler = res => {
  res.status(404).json("not found");
};

module.exports = errorHandler;
