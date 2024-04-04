import User from "../models/user.model.js";

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
