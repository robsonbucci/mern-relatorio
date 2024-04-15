import Publisher from "../models/publisher.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const createPublisher = async (req, res, next) => {
    if (req.user.id !== req.params.id)
        return next(
            errorHandler(
                401,
                "Voce não tem permissão para realizar esta operação",
            ),
        );

    const { ...rest } = req.body;

    const newPublisher = new User({ ...rest });

    try {
        await newPublisher.save();
        res.status(201).json({ message: "Publicador criado com sucesso" });
    } catch (error) {
        if (
            error?.keyPattern?.congregationIdentity === 1 &&
            error?.keyPattern?.congregationName === 1
        ) {
            return next(
                errorHandler(
                    409,
                    "Este publicador está cadastro na congregação: " +
                        req.body.congregationName,
                ),
            );
        }

        if (error?.keyPattern?.phone === 1)
            return next(errorHandler(409, "Este telefone está em uso"));

        if (
            error?.keyPattern?.firstName === 1 &&
            error?.keyPattern?.lastName === 1
        )
            return next(
                errorHandler(409, "Este nome e sobrenome já foram cadastrados"),
            );
        return next(errorHandler(500, error.message));
    }
};

export const updateSuperintendent = async (req, res, next) => {
    if (req.user.id !== req.params.id)
        return next(
            errorHandler(
                401,
                "Voce não tem permissão para realizar esta operação",
            ),
        );

    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    avatar: req.body.avatar,
                    isSecretary: req.body.isSecretary,
                },
            },
            { new: true },
        );

        const { password, ...rest } = updatedUser._doc;

        res.status(200).json({ rest });
    } catch (error) {
        next(error);
    }
};

export const getSuperintendent = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.find({ _id: id });
        const result = user.map((user) => {
            const { password, avatar, ...rest } = user._doc;
            return rest;
        });
        res.json({ result });
    } catch (error) {
        return next(
            errorHandler(500, "Ocorreu um erro ao buscar os superintendentes."),
        );
    }
};

export const getPublisher = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.find({ _id: id });
        const result = user.map((user) => {
            const { password, avatar, ...rest } = user._doc;
            return rest;
        });
        res.json({ result });
    } catch (error) {
        console.error(error);
        return next(errorHandler(500, "Ocorreu um erro ao buscar o usuário."));
    }
};

export const getAllPublishersBySuperintendent = async (req, res, next) => {
    const { id } = req.params;

    if (req.user.id !== id)
        return next(
            errorHandler(
                403,
                "Voce não tem permissão para realizar esta operação",
            ),
        );

    try {
        const user = await User.find({ userType: "superintendente" });
        const result = user.map((user) => {
            const { password, avatar, ...rest } = user._doc;
            return rest;
        });
        res.json({ result });
    } catch (error) {
        console.error(error);
        return next(
            errorHandler(500, "Ocorreu um erro ao buscar os publicadores."),
        );
    }
};
