import Ministry from "../models/ministry.model.js";
import { errorHandler } from "../utils/error.js";

const month = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export const createMinistry = async (req, res, next) => {
  const { ...rest } = req.body;

  const newMinistry = new Ministry({ ...rest });
  try {
    const savedMinistry = await newMinistry.save();
    res.status(200).json(savedMinistry);
  } catch (error) {
    console.log("🚀 ~ createMinistry ~ error?.keyPattern:", error?.keyPattern);
    if (error?.keyPattern?.["Publisher._id"] === 1) {
      return next(
        errorHandler(
          409,
          "Você já enviou o relatório do mês de " + month[req.body.month - 1],
        ),
      );
    }
    next(error);
  }
};
