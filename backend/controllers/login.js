import UserModel from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // if (!email) return res.status(400).json({ error: 'Email is required !' });
    // if (!password || password.length < 6)
    //   return res.status(400).json({
    //     error: 'Password is required and should have at least 6 characters!',
    //   });
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Email not found !' });
    console.log(user, password);
    const match = bcrypt.compareSync(password, user.password);
    if (match) {
      jwt.sign(
        { id: user._id, name: user.name, email: user.email },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) {
            throw err;
          }
          //console.log(token);
          res.cookie('token', token).json({
            id: user._id,
            name: user.name,
            email: user.email,
            created_at: user.created_at,
            uodated_at: user.created_at,
          });
        }
      );
    } else {
      res.status(401).json('Incorect password !');
    }
  } catch (error) {
    res.status(401).json(error.message);
  }
};

export default loginUser;
