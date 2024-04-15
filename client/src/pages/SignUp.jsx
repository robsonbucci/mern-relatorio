import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState({
        isSecretary: false,
        privilege: "publicador",
        avatar: "https://firebasestorage.googleapis.com/v0/b/mern-relatorio.appspot.com/o/user-128.png?alt=media&token=cb057f95-2b74-4a4f-ad91-f03a890317ef",
    });
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [isSecretary, setIsSecretary] = React.useState(false);
    const [privilege, setPrivilege] = React.useState("publicador");
    const [phone, setPhone] = React.useState("");

    const handlePhoneChange = (input) => {
        let formattedInput;
        if (input.length <= 10) {
            // Formato (11)1234-1234
            formattedInput = input.replace(
                /^(\d{2})(\d{4})(\d{4}).*/,
                "($1)$2-$3",
            );
        } else {
            // Formato (11)99999-9999
            formattedInput = input.replace(
                /^(\d{2})(\d{5})(\d{4}).*/,
                "($1)$2-$3",
            );
        }
        setPhone(formattedInput);
    };

    const handleChange = ({ target }) => {
        const { id, checked, value } = target;
        let updatedFormData = { ...formData };

        if (id === "phone") {
            const phoneInput = value.replace(/\D/g, "");
            handlePhoneChange(phoneInput);
            updatedFormData[id] = phoneInput;
        } else if (["regular", "auxiliar", "publicador"].includes(id)) {
            setPrivilege(id);
            updatedFormData["privilege"] = id;
        } else if (id === "isSecretary") {
            setIsSecretary(checked);
            updatedFormData[id] = checked;
        } else if (
            !["regular", "auxiliar", "publicador", "phone"].includes(id)
        ) {
            updatedFormData[id] = value.toString().toLowerCase().trim();
        }

        setFormData(updatedFormData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await fetch("api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success === false) {
                setError(data.message);
                setLoading(false);
                return;
            }
            setLoading(false);
            setError(null);

            navigate("/sign-in");
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    };

    return (
        <div className="p-3 mx-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">
                Cadastro
            </h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <fieldset className="flex flex-col gap-4 border p-3">
                    <legend className="text-lg font-semibold">
                        Informações Pessoais
                    </legend>

                    <input
                        type="text"
                        placeholder="Primeiro Nome"
                        className="border p-3 rounded-lg"
                        id="firstName"
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        placeholder="Sobrenome"
                        className="border p-3 rounded-lg"
                        id="lastName"
                        onChange={handleChange}
                    />
                    <input
                        type="tel"
                        placeholder="Telefone (apenas números)"
                        className="border p-3 rounded-lg"
                        id="phone"
                        value={phone}
                        onChange={({ target }) => handleChange({ target })}
                        maxLength={14}
                    />
                </fieldset>

                <fieldset className="flex flex-col gap-4 border p-3">
                    <legend className="text-lg font-semibold">
                        Informações de Acesso
                    </legend>
                    <input
                        type="text"
                        placeholder="Nome de usuário"
                        className="border p-3 rounded-lg"
                        id="username"
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        placeholder="E-mail"
                        className="border p-3 rounded-lg"
                        id="email"
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        className="border p-3 rounded-lg"
                        id="password"
                        onChange={handleChange}
                    />
                </fieldset>

                <fieldset className="flex flex-col gap-4 border p-3">
                    <legend className="text-lg font-semibold">
                        Informações Congregacionais
                    </legend>

                    <input
                        type="number"
                        placeholder="Número da congregação"
                        className="border p-3 rounded-lg"
                        id="congregationIdentity"
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        placeholder="Nome da congregação (FAVOR NÃO ABREVIAR)"
                        className="border p-3 rounded-lg"
                        id="congregationName"
                        onChange={handleChange}
                        maxLength={35}
                    />

                    <input
                        type="text"
                        placeholder="Nome do seu grupo congregacional"
                        className="border p-3 rounded-lg"
                        id="congregationGroup"
                        onChange={handleChange}
                        maxLength={20}
                    />
                </fieldset>

                <fieldset className="flex flex-col gap-4 border p-3">
                    <legend className="text-lg font-semibold">
                        Selecione seu privilégio
                    </legend>
                    <div className="border p-3 text-center font-semibold flex flex-col items-baseline gap-4">
                        <div className="flex gap-4">
                            <label
                                className="cursor-pointer text-slate-700"
                                htmlFor="isSecretary"
                            >
                                Secretário
                            </label>
                            <input
                                type="checkbox"
                                className="border p-3 rounded-lg"
                                id="isSecretary"
                                onChange={handleChange}
                                checked={isSecretary}
                            />
                        </div>
                        <div className="flex gap-4">
                            <label
                                className="cursor-pointer text-slate-700"
                                htmlFor="regular"
                            >
                                Pioneioro Regular
                            </label>
                            <input
                                type="radio"
                                className="border p-3 rounded-lg"
                                id="regular"
                                name="privilege"
                                onChange={handleChange}
                                checked={privilege === "regular"}
                                maxLength={10}
                            />
                        </div>
                        <div className="flex gap-4">
                            <label
                                className="cursor-pointer text-slate-700"
                                htmlFor="auxiliar"
                            >
                                Pioneiro Auxiliar
                            </label>
                            <input
                                type="radio"
                                className="border p-3 rounded-lg"
                                id="auxiliar"
                                name="privilege"
                                onChange={handleChange}
                                checked={privilege === "auxiliar"}
                            />
                        </div>
                        <div className="flex gap-4">
                            <label
                                className="cursor-pointer text-slate-700"
                                htmlFor="publicador"
                            >
                                Publicador
                            </label>
                            <input
                                type="radio"
                                className="border p-3 rounded-lg"
                                id="publicador"
                                name="privilege"
                                onChange={handleChange}
                                checked={privilege === "publicador"}
                            />
                        </div>
                    </div>
                </fieldset>

                {error && (
                    <p className="text-red-500 my-3 text-center">{error}</p>
                )}
                <button
                    disabled={loading}
                    className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
                >
                    {loading ? "Carregando..." : "Cadastrar"}
                </button>
            </form>
            <div className="flex mt-5 gap-2">
                <p>Já possui uma conta?</p>
                <Link to="/sign-in">
                    <span className="text-blue-700">Entrar</span>
                </Link>
            </div>
        </div>
    );
}
