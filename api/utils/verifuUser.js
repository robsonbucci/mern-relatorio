import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.accress_token;

    if (!token) return next(errorHandler(401, "Usuário não autenticado"));

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(errorHandler(403, "Token inválido"));

        req.user = user;
        next();
    });
};
