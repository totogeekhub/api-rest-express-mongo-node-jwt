import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import { generateRefreshToken, generateToken } from "../utils/tokenManager.js";

export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Alternativa buscando por email
    let user = await User.findOne({ email });
    if (user) throw { code: 11000 };

    user = new User({ email, password });
    await user.save();

    // Generar el token JWT

    return res.status(201).json({ ok: true });
  } catch (error) {
    console.log(error);
    // alternativa por defecto mongoose
    if (error.code === 11000) {
      return res.status(400).json({ error: "Ya existe este usuario" });
    }
    return res.status(500).json({ error: "Error de servidor" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) return res.status(403).json({ error: "No existe este usuario" });

    const respuestaPassword = await user.comparePassword(password);
    if (!respuestaPassword) {
      return res.status(403).json({ error: "Contraseña incorrecta" });
    }
    // Generar el token JWT
    const { token, expiresIn } = generateToken(user.id);
    generateRefreshToken(user.id, res);

    // res.cookie("token", token, {
    //   httpOnly: true,
    //   secure: !(process.env.MODO === "developer"),
    // });

    return res.json({ token, expiresIn });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error de servidor" });
  }
};

export const infoUser = async (req, res) => {
  try {
    // lean para devolver un objeto simple de JS y no el objeto enriquecido de mongoose
    const user = await User.findById(req.uid).lean();
    return res.json({ email: user.email, uid: user.id });
  } catch (error) {
    return res.status(500).json({ error: "Error de server" });
  }
};

export const refreshToken = (req, res) => {
  try {
    const refreshTokenCookie = req.cookies.refreshToken;
    if (!refreshTokenCookie) throw new Error("No existe el token");

    const { uid } = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH);
    const { token, expiresIn } = generateToken(uid);

    return res.json({ token, expiresIn });
  } catch (error) {
    console.log(error);
    const TokenVerificationErrors = {
      "invalid signature": "La firma del JWT no es valida",
      "jwt expired": "JWT expirado",
      "invalid token": "Token no válido",
      "No Bearer": "Utiliza formato Bearer",
      "jwt malformed": "JWT formato no válido",
    };

    return res
      .status(401)
      .send({ error: TokenVerificationErrors[error.message] });
  }
};

export const logOut = (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ ok: true });
};
