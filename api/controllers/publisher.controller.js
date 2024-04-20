import { FaJarWheat } from "react-icons/fa6";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const signinPublisher = async (req, res, next) => {
  const { phone } = req.body;
  try {
    const validUser = await User.findOne({ phone });
    if (!validUser)
      return next(
        errorHandler(
          404,
          "Usuário não encontrado. Fale com seu Superintendente de grupo.",
        ),
      );
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password, avatar, ...rest } = validUser._doc;
    res
      .cookie("publisher_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
