import Publisher from "../models/publisher.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const createPublisher = async (req, res, next) => {
  const { gender, firstName, lastName, userType, phone, superintendent, privilege, status } =
    req.body;
  const newPublisher = new Publisher({
    gender,
    firstName,
    lastName,
    userType,
    phone,
    superintendent,
    privilege,
    status,
  });
  try {
    await newPublisher.save();
    res.status(201).json({ message: "Publicador criado com sucesso" });
  } catch (error) {
    if (
      error?.keyPattern?.superintendent === 1 &&
      error?.keyPattern?.firstName === 1 &&
      error?.keyPattern?.lastName === 1
    ) {
      const { congregationId } = await User.findById(superintendent._id).select("congregationId");

      return next(
        new Error(
          errorHandler(409, "Este publicador está cadastro na congregação: " + congregationId),
        ),
      );
    }
    next(new Error(errorHandler(500, error.message)));
  }
};

export const publishersList = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.find({ "superintendent._id": userId });
    const result = user.map((user) => {
      const { password, avatar, ...rest } = user._doc;
      return rest;
    });
    res.json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ocorreu um erro ao buscar o usuário." });
  }
};
