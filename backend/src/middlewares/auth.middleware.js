import jwt from 'jsonwebtoken';

export default function Auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).send({ message: 'Acceso no autorizado!' });
  } else {
    const secretKey = process.env.SECRET_KEY;
    jwt.verify(token, secretKey, (err, payload) => {
      if (err) {
        res.status(401).send({ error: 'Acceso no autorizado!' });
      } else {
        res.locals.user = {
          id: payload?._id,
          name: payload?.name,
        };
        next();
      }
    });
  }
}
