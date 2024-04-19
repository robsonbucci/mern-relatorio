import React from "react";

import Input from "../../shared/inputs/Input";
import InputPhone from "../../shared/inputs/InputPhone.jsx";

const Report = () => {
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [auth, setAuth] = React.useState(true);
  const [formData, setFormData] = React.useState({});
  const meses = [
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
  const dataAtual = new Date();
  const mesAtual = dataAtual.getMonth();
  const ultimoMes = mesAtual === 0 ? 11 : mesAtual - 1;
  const penultimoMes = ultimoMes === 0 ? 11 : ultimoMes - 1;
  const [participated, setParticipated] = React.useState(false);
  console.log("🚀 ~ Report ~ formData:", formData);

  const handleChange = ({ target }) => {
    let updatedFormData = { ...formData };
    if (target.id === "participated") {
      updatedFormData[target.id] = target.checked;
      setParticipated(target.checked);
    }
    setFormData(updatedFormData);
  };

  const handlePublisherLogin = async (e) => {
    e.preventDefault();
    let phone;
    if (formData.phone) {
      phone = formData?.phone.replace(/\D/g, "");
    }

    try {
      setLoading(true);

      const res = await fetch("api/publisher/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone,
        }),
      });

      const data = await res.json();

      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      setAuth(true);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className="p-3 mx-w-lg max-w-xl mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Relatório</h1>
      <form className="flex flex-col gap-4">
        <InputPhone
          type="tel"
          name="phone"
          id="phone"
          className="border p-3 rounded-lg"
          onChange={handleChange}
          value={formData.phone}
        />

        <button
          hidden={auth}
          disabled={loading}
          onClick={handlePublisherLogin}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          Pesquisar
        </button>

        {error && <p className="text-red-500 my-3 text-center">{error}</p>}

        {auth && (
          <>
            <label htmlFor="participated">Participou</label>
            <Input
              type="checkbox"
              id="participated"
              value={participated}
              onChange={handleChange}
            />
          </>
        )}

        {auth && participated && (
          <>
            <select>
              <option value={penultimoMes}>{meses[penultimoMes]}</option>
              <option value={ultimoMes}>{meses[ultimoMes]}</option>
            </select>

            <Input
              type="text"
              id="hour"
              className="border p-3 rounded-lg"
              placeholder="Horas"
              onChange={handleChange}
              value={formData.name}
            />
            <Input
              type="text"
              id="study"
              className="border p-3 rounded-lg"
              placeholder="Estudos"
              onChange={handleChange}
              value={formData.name}
            />

            <label htmlFor="description">Observações</label>
            <textarea
              id="description"
              className="border p-3 rounded-lg resize-none"
              onChange={handleChange}
              value={formData.description}
            ></textarea>
          </>
        )}
      </form>
    </div>
  );
};

export default Report;
