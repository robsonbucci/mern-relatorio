import React from "react";
import { useSelector } from "react-redux";

export default function Publisher() {
  const { currentUser } = useSelector((state) => state.user);
  console.log("🚀 ~ Publisher ~ currentUser:", currentUser);
  const [formData, setFormData] = React.useState({
    userType: "publicador",
    privilege: "publicador",
    status: "ativo",
    gender: "m",
    congregationIdentity: currentUser.congregationIdentity,
    congregationName: currentUser.congregationName,
    congregationGroup: currentUser.congregationGroup,
  });

  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [createSuccess, setCreateSuccess] = React.useState(false);
  const [phone, setPhone] = React.useState("");

  const handlePhoneChange = (input) => {
    let formattedInput;
    if (input.length <= 10) {
      // Formato (11)1234-1234
      formattedInput = input.replace(/^(\d{2})(\d{4})(\d{4}).*/, "($1)$2-$3");
    } else {
      // Formato (11)99999-9999
      formattedInput = input.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1)$2-$3");
    }
    setPhone(formattedInput);
  };

  const handleChange = (event) => {
    const { value, checked, type, id } = event.target;

    if (id === "phone") {
      const phoneInput = value.replace(/\D/g, "");
      handlePhoneChange(phoneInput);
      setFormData((prev) => ({
        ...prev,
        [id]: phoneInput,
      }));
    } else if (type === "radio") {
      setFormData((prev) => ({
        ...prev,
        privilege: value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: type === "checkbox" ? checked : value,
        superintendent: {
          _id: currentUser._id,
          superintendentName: currentUser.superintendent.superintendentName,
        },
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCreateSuccess(false);
    setError(false);
    setLoading(true);
    try {
      const res = await fetch(`api/user/publisher/create/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        setError(data.message);
        return;
      }

      e.target.reset();
      setCreateSuccess(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto font-semibold">
      <h1 className="text-3xl font-semibold text-center my-7">
        Cadastro de Publicadores
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={handleChange}
          type="text"
          placeholder="nome"
          className="border p-3 rounded-lg"
          id="firstName"
        />
        <input
          onChange={handleChange}
          type="text"
          placeholder="sobrenome"
          className="border p-3 rounded-lg"
          id="lastName"
        />
        <input
          onChange={handleChange}
          type="tel"
          placeholder="Telefone (apenas números)"
          className="border p-3 rounded-lg"
          id="phone"
          value={phone}
          maxLength={14}
        />
        <select
          className="border p-3 rounded-lg text-slate-700"
          id="gender"
          onChange={handleChange}
        >
          <option value="m">Masculino</option>
          <option value="f">Feminino</option>
        </select>

        <fieldset className="flex flex-col gap-4 border p-3">
          <legend className="text-lg font-semibold">
            Selecione o Privilégio
          </legend>
          <div className="flex gap-4">
            <input
              onChange={handleChange}
              checked={formData.privilege === "publicador"}
              type="radio"
              name="privilege"
              id="publicador"
              value="publicador"
            />
            <label htmlFor="publicador">Publicador</label>
          </div>
          <div className="flex gap-4">
            <input
              onChange={handleChange}
              checked={formData.privilege === "auxiliar"}
              type="radio"
              name="privilege"
              id="auxiliar"
              value="auxiliar"
            />
            <label htmlFor="auxiliar">Pioneiro auxiliar</label>
          </div>
          <div className="flex gap-4">
            <input
              onChange={handleChange}
              checked={formData.privilege === "regular"}
              type="radio"
              name="privilege"
              id="regular"
              value="regular"
            />
            <label htmlFor="regular">Pioneiro regular</label>
          </div>
        </fieldset>

        {error && <p className="text-red-500 my-3 text-center">{error}</p>}
        {createSuccess && (
          <p className="text-green-500 my-3 text-center">
            Publicador criado com sucesso
          </p>
        )}

        <button
          disabled={loading}
          type="submit"
          className="bg-slate-700 text-white p-3 mt-3 rounded-lg uppercase hover:opacity-95"
        >
          {loading ? "carregando..." : "cadastrar"}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">listar Publicadores</span>
        <span className="text-red-700 cursor-pointer">Cancelar</span>
      </div>
    </div>
  );
}
