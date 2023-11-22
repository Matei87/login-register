import jwt from 'jsonwebtoken';

export const profileUser = (req, res) => {
  const { token } = req.cookies;
  //   console.log(token);
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) {
        throw err;
      }
      res.status(200).json(user);
    });
  } else {
    res.status(401).json(null);
  }
};
