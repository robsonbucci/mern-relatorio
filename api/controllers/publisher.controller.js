import Publisher from '../models/publisher.model.js';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';

export const test = (req, res, next) => {
  res.json({ message: 'Api route is working' });
};

export const create = async (req, res, next) => {
  const { gender, firstName, secondName, designation, phone, adminId } = req.body;
  const newPublisher = new Publisher({
    gender,
    firstName,
    secondName,
    designation,
    phone,
    adminId,
  });
  try {
    await newPublisher.save();
    res.status(201).json({ message: 'Publicador criado com sucesso' });
  } catch (error) {
    if (
      error?.keyPattern?.adminId === 1 &&
      error?.keyPattern?.firstName === 1 &&
      error?.keyPattern?.secondName === 1
    ) {
      const { congregationId } = await User.findById(adminId).select('congregationId');

      return next(
        new Error(
          errorHandler(409, 'Este publicador está cadastro na congregação: ' + congregationId)
        )
      );
    }
    next(new Error(errorHandler(500, error.message)));
  }
};
