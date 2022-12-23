import {Router} from "express";
import { infoUser, login, register, refreshToken, logOut } from "../controllers/auth.controller.js";
import { body } from "express-validator";
import { validationResultExpress } from "../middlewares/validationResultExpress.js";
import { requireToken } from "../middlewares/requireToken.js";

const router = Router();

router.post(
  "/register",
  [
    body("email", "Formato de email incorrecto")
      .trim()
      .isEmail()
      .normalizeEmail(),
    body("password", "Mínimo 6 carácteres").trim().isLength({ min: 6 }),
    body("password", "formato de password incorrecto").custom(
      (value, { req }) => {
        if (value !== req.body.repassword) {
          throw new Error("No coinciden las contraseñas");
        }
        return value;
      }
    ),
  ],
  validationResultExpress,
  register
);
router.post(
  "/login",
  [
    body("email", "Formato de email incorrecto")
      .trim()
      .isEmail()
      .normalizeEmail(),
    body("password", "Mínimo 6 carácteres").trim().isLength({ min: 6 }),
  ],
  validationResultExpress,
  login
);

router.get('/protected', requireToken,infoUser)
router.get('/refresh', refreshToken)
router.get('/logout', logOut)

export default router;
