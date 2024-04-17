import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { password, ...rest } = req.body;

  const hashedPassword = bcryptjs.hashSync(password, 10);

  try {
    const newUser = new User({
      password: hashedPassword,
      ...rest,
    });

    const superintendent = await newUser.save();

    await User.updateOne(
      { _id: superintendent._id },
      {
        $set: {
          superintendent: {
            _id: superintendent._id,
            superintendentName: `${superintendent.firstName} ${superintendent.lastName}`,
          },
        },
      },
      { new: true }, // retorna documento atualizado
    );

    res.status(201).json({ message: "Usuário criado com sucesso" });
  } catch (error) {
    const errorCodes = {
      congregationId: "Já há um secretário cadastrado na congregação informada",
      username: "Este nome de usuário já existe",
      email: "Este e-mail já existe",
      phone: "Este telefone já existe",
    };

    const errorKey = Object.keys(error?.keyPattern || {}).find(
      (key) => errorCodes[key],
    );
    if (errorKey) {
      const errorMessage = errorCodes[errorKey];
      return next(new Error(errorHandler(409, errorMessage)));
    }

    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser)
      return next(new Error(errorHandler(404, "Usuário não encontrado")));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword)
      return next(new Error(errorHandler(404, "usuário ou senha inválidos")));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    const { password, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const signout = async (req, res, next) => {
  try {
    res.clearCookie("access_token").status(200).json("Usuário desconectado");
  } catch (error) {
    next(error);
  }
};
