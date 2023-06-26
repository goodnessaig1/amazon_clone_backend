const bcrypt = require('bcrypt');
const { createToken } = require('../utils/jwtGenerator');
const { User } = require('../models/user');

class UserController {
  static async sign_up(req, res) {
    try {
      const { firstLastName, mobileOrEmail, password } = req.body;
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const bcryptPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        firstLastName,
        mobileOrEmail,
        password: bcryptPassword,
      });
      await newUser.save();
      const token = createToken({
        mobileOrEmail: newUser.mobileOrEmail,
      });
      return res.json({
        status: 'success',
        data: {
          message: 'User account successfully created',
          user: newUser,
          token: token,
        },
      });
    } catch (error) {
      res.status(500).json({ status: 'Failed', message: error.message });
    }
  }

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

  static async userAuth(req, res) {
    try {
      const { mobileOrEmail } = req.user;
      const user = await User.findOne({ mobileOrEmail });
      if (!user) {
        return res
          .status(404)
          .json({ message: 'User not found', authenticated: false });
      }
      res.json({ userAuth: user, authenticated: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = UserController;
