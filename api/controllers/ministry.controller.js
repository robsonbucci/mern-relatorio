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
  if (req?.user?.id !== req.params?.id)
    return next(
      errorHandler(401, "Voce não tem permissão para realizar esta operação"),
    );

  const newMinistry = new Ministry({ ...rest });
  try {
    const savedMinistry = await newMinistry.save();
    res.status(200).json(savedMinistry);
  } catch (error) {
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

export const listMinistry = async (req, res, next) => {
  try {
    const ministry = await Ministry.find();
    res.status(200).json(ministry);
  } catch (error) {
    next(error);
  }
};
