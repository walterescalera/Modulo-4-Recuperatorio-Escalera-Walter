import { Request, Response } from "express";
import { User } from "../entity/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const jwtSecret = "somesecrettoken";
const jwtRefreshTokenSecret = "somesecrettokenrefresh";
let refreshTokens: (string | undefined)[] = [];

const createToken = (user: User) => {
  // Se crean el jwt y refresh token
  const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
    expiresIn: "300s",
  });
  const refreshToken = jwt.sign({ email: user.email }, jwtRefreshTokenSecret, {
    expiresIn: "90d",
  });

  refreshTokens.push(refreshToken);
  return {
    token,
    refreshToken,
  };
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({ relations: ["recetas"] });

    return res.json(users);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ 
      where: { id: parseInt(id) }, 
      relations: ["recetas"] 
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.json(user);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
  
  export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
      const user = await User.findOneBy({ id: parseInt(id) });
      if (!user) return res.status(404).json({ message: "Not user found" });
  
      await User.update({ id: parseInt(id) }, req.body);
  
      return res.sendStatus(204);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
    }
  };

  export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
      
    const user = await User.findOne({ 
      where: { id: parseInt(id) }, 
      relations: ["recetas"] 
    });
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
  
      // Eliminar las recetas asociadas en cascada
      await Promise.all(user.recetas.map(async (receta) => await receta.remove()));
  
      // Eliminar el usuario
      await user.remove();
  
      return res.sendStatus(204);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
    }
  };
  
    // ------- Agregar para jwt
  
  //  Register
  export const signUp = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ msg: "Please. Send your email and password" });
    }
  
    const user = await User.findOneBy({ email: req.body.email });
    if (user) {
      return res.status(400).json({ msg: "The User already Exists" });
    }
  
    const newUser = new User();
    newUser.email = req.body.email;
    newUser.password = await createHash(req.body.password);
    await newUser.save();
    return res.status(201).json(newUser);
  };
  
  //  Login
  export const signIn = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ msg: "Please. Send your email and password" });
    }
  
    const user = await User.findOneBy({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ msg: "The User does not exist" });
    }
  
    if (user && !isNaN(user.id)) {
      return res.status(201).json({ credentials: createToken(user) });
    } else {
      return res.status(500).json({ msg: "Invalid user data" });
    }
  };
  


  export const protectedEndpoint = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    return res.status(200).json({ msg: "ok" });
  };
  
  const comparePassword = async (
    user: User,
    password: string
  ): Promise<Boolean> => {
    return await bcrypt.compare(password, user.password);
  };
  
  const createHash = async (password: string): Promise<string> => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  };
  
  // Create new access token from refresh token
  export const refresh = async (req: Request, res: Response): Promise<any> => {
    const refreshToken = req.body.refresh;
    // If token is not provided, send error message
    if (!refreshToken) {
      res.status(401).json({
        errors: [{ msg: "Token not found" }],
      });
    }
    // If token does not exist, send error message
    if (!refreshTokens.includes(refreshToken)) {
      res.status(403).json({
        errors: [{ msg: "Invalid refresh token" }],
      });
    }
    try {
      const user = jwt.verify(refreshToken, jwtRefreshTokenSecret);
      // user = { email: 'jame@gmail.com', iat: 1633586290, exp: 1633586350 }
      const { email } = <any>user;
      const userFound = <User>await User.findOneBy({ email: email });
      if (!userFound) {
        return res.status(400).json({ msg: "The User does not exists" });
      }
      const accessToken = jwt.sign(
        { id: userFound.id, email: userFound.email },
        jwtSecret,
        { expiresIn: "1000s" }
      );
      res.json({ accessToken });
    } catch (error) {
      res.status(403).json({
        errors: [{ msg: "Invalid token" }],
      });
    }
  };
 