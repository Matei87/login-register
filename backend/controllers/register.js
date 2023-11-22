import UserModel from '../models/user.js';
import bcrypt from 'bcrypt';

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      res.status(401).json({ error: 'Name is required !' });
    }
    if (!email) {
      res.status(401).json({ error: 'Email is required !' });
    }
    if (!password || password.length < 6)
      res.status(401).json({
        error: 'Password is required and should have at least 6 characters!',
      });
    const exist = await UserModel.findOne({ email });
    if (exist) {
      res.status(401).json({ error: 'Email already in use !' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json(error.message);
  }
};

export default registerUser;
