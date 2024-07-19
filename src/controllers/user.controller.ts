import { Request, Response } from "express";
import userService from "../services/user.service";
import jwt from "jsonwebtoken";

const register = async (req: Request, res: Response) => {
  try {
    const user = await userService.createUser(req.body);
    const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: "1d" } 
      );
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: "Registration failed" });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await userService.authenticateUser(email, password);

    if (user) {
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: "1d" } 
      );
      res.json({ user, token });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(400).json({ error: "Login failed" });
  }
};

export default {
  register,
  login,
};
