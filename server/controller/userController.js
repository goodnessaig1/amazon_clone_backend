const bcrypt = require('bcrypt');
const { createToken } = require('../utils/jwtGenerator');
const { User } = require('../models/user');

class UserController {
  static async signIn(req, res) {
    const { mobileOrEmail, password } = req.body;
    try {
      const user = await User.findOne({ mobileOrEmail });
      if (!user) {
        return res
          .status(404)
          .json({ status: 'Failed', message: 'User not found' });
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res
          .json({ status: 'Failed', message: 'Incorrect password' })
          .status(401);
      }
      const token = createToken({
        mobileOrEmail: user.mobileOrEmail,
      });
      return res.json({
        status: 'success',
        data: {
          message: 'Sign-in successful',
          user: user,
          token: token,
        },
      });
    } catch (err) {
      res.status(500).send({
        message: 'Server Error',
        error: err.message,
      });
    }
  }
}

module.exports = UserController;
