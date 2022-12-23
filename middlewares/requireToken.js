import jwt from "jsonwebtoken";

export const requireToken = (req, res, next) => {
  try {
    let token = req.headers?.authorization;
    console.log(token);
    if (!token) throw new Error("No Bearer");

    // SPLIT para separar el Bearer del token
    token = token.split(" ")[1];
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = uid;

    next();
  } catch (error) {
    console.log(error.message);

    const TokenVerificationErrors = {
      "invalid signature": "La firma del JWT no es valida",
      "jwt expired": "JWT expirado",
      "invalid token": "Token no válido",
      "No Bearer": "Utiliza formato Bearer",
      "jwt malformed": "JWT formato no válido"
    };

    return res
      .status(401)
      .send({ error: TokenVerificationErrors[error.message] });

    // return res.status(401).json({ error: error.message });
  }
};

// export const requireTokenCookieSegura = (req, res, next) => {
//   try {
//     let token = req.cookies.token;
//     console.log(token);
//     if (!token) throw new Error("No Bearer");

//     // SPLIT para separar el Bearer del token
//     // token = token.split(" ")[1];
//     const { uid } = jwt.verify(token, process.env.JWT_SECRET);
//     req.uid = uid;

//     next();
//   } catch (error) {
//     console.log(error.message);

//     const TokenVerificationErrors = {
//       "invalid signature": "La firma del JWT no es valida",
//       "jwt expired": "JWT expirado",
//       "invalid token": "Token no válido",
//       "No Bearer": "Utiliza formato Bearer",
//       "jwt malformed": "JWT formato no válido"
//     };

//     return res
//       .status(401)
//       .send({ error: TokenVerificationErrors[error.message] });

//     // return res.status(401).json({ error: error.message });
//   }
// };

