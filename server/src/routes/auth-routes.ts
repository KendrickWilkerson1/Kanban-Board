import { Router, Request, Response } from "express";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
dotenv.config();


export const login = async (req: Request, res: Response) => {
  // DONE: If the user exists and the password is correct, return a JWT token
  try {
    console.log('TESTING TO SEE IF THIS IS WORKING')
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    // console.log('THIS IS THE USER DATA', user)

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Password not valid" });
    }

    console.log('VALID PASSWORD', validPassword)

    const secretKey = process.env.JWT_SECRET_KEY || "";
    console.log('SECRET KEY', secretKey)
    const token = jwt.sign({ username }, secretKey, { expiresIn: "1h" });
    console.log('THIS IS THE TOKEN', token)

    return res.json({ token });

  } catch (error) {
    console.log(error)
    return res.status(500)
  }
};

const router = Router();

// POST /login - Login a user
router.post("/login", login);

export default router;
