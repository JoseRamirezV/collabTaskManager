import jwt, { type JwtPayload } from 'jsonwebtoken';
import type { Request, Response, NextFunction} from 'express';

interface CustomJwtPayload extends JwtPayload {
  _id: string;
  name: string;
}

export default function Auth (req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).send({ message: "Acceso no autorizado!" });
  } else {
    const secretKey = process.env.SECRET_KEY as string
    jwt.verify(token, secretKey, (err, payload) => {
      if (err) {
        res.status(401).send({ error: "Acceso no autorizado!" });
      } else {
        res.locals.user= {
          id: (payload as CustomJwtPayload)?._id,
          name: (payload as CustomJwtPayload)?.name
        }
        next();
      }
    });
  }
};
