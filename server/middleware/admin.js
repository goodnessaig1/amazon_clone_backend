/* eslint-disable consistent-return */
const isAdmin = (req, res, next) => {
  if (req.user.isAdmin === false) {
    return res.status(403).send('Not allowed to perform this process');
  }
  next();
};

module.exports = isAdmin;
