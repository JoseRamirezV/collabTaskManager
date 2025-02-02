import bcrypt from 'bcrypt';
import type { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import type { User as UserInterface } from '#interfaces/user.interface';
import User from '#models/user';

interface CustomJwtPayload extends JwtPayload {
  _id: string;
}

const excludeSensitiveFields = {
  password: 0,
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.params;
    const user = await User.findOne({ email }).lean();

    if (!user) throw new Error('User not found');

    const authenticated = bcrypt.compareSync(password, user.password);
    if (!authenticated) throw new Error('Credenciales incorrectas');
    const { password: _, ...data } = user;

    const token = generateToken({ ...user });
    res.status(200).json({ data, token });
  } catch (error) {
    console.log({error});
    if (error instanceof Error) {
      res.status(200).json({ error: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user)
      throw new Error('Este correo electrónico ya se encuentra registrado');
    const password = encryptPassword(req.body.password);

    const newUser = new User({
      ...req.body,
      password,
    });
    await newUser.save();

    res.status(201).send({ ok: true });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(200).json({ error: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.id;
    delete req.body.password;
    const userData = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
      fields: { ...excludeSensitiveFields },
    });

    if (!userData) throw new Error('User not found');

    res.json({ ok: true, user: userData });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(200).json({ error: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const { passwordCheck } = req.params;
    const userId = res.locals.userId
    const { password } = (await User.findById(userId)) as UserInterface;
    const passwordMatches = bcrypt.compareSync(passwordCheck, password);
    if (!passwordMatches) throw new Error('Contraseña incorrecta');
    await User.deleteOne({ _id: userId });
    res.json({ ok: true });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(200).json({ error: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};

export const verifyToken = (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    if (!token) throw new Error('La sesión caducó');
    jwt.verify(
      token,
      process.env.SECRET_KEY as string,
      async (err, decoded) => {
        if (err) return res.status(401).json({ error: 'La sesión caducó' });
        const { _id } = decoded as CustomJwtPayload;
        const user = await User.findById(_id);
        res.status(200).json({ ok: true, user });
      }
    );
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(200).json({ error: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};

const encryptPassword = (password: string) => {
  const saltRounds = Number(process.env.SALT_ROUNDS);
  return bcrypt.hashSync(password, saltRounds);
};

const generateToken = (data: UserInterface) =>
  jwt.sign(data, process.env.SECRET_KEY as string, {
    expiresIn: '1d',
  });
