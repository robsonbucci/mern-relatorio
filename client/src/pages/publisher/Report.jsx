import React from "react";
import { useNavigate } from "react-router-dom";

import Input from "../../shared/inputs/Input";
import InputPhone from "../../shared/inputs/InputPhone.jsx";
import formatPhoneNumber from "../../utils/phoneUtils.js";

const Report = () => {
  const dataAtual = new Date();
  const currentMonth = dataAtual.getMonth();
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const penultimateMonth = lastMonth === 0 ? 11 : lastMonth - 1;
  const months = [
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

  const navigate = useNavigate();

  const [participated, setParticipated] = React.useState(false);
  const [publisher, setPublisher] = React.useState(false);

  const [formData, setFormData] = React.useState({
    month: currentMonth,
    participated: false,
    year: dataAtual.getFullYear(),
  });

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [auth, setAuth] = React.useState(false);

  const handleChange = ({ target }) => {
    const { id, checked, value, name } = target;
    let updatedFormData = { ...formData };

    if (id === "phone") {
      const formatPhone = formatPhoneNumber(value);
      updatedFormData[id] = formatPhone;
    } else if (name === "participated") {
      if (id === "participated") {
        updatedFormData[id] = checked;
        setParticipated(checked);
      }
      if (id === "notParticipated") {
        updatedFormData["participated"] = false;
        setParticipated(false);
      }
    } else {
      updatedFormData[id] = value;
    }
    setFormData(updatedFormData);
  };

  const handleSearchPublisher = async (e) => {
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
      setPublisher({ ...data });

      const publisherObj = {
        publisher: {
          _id: data._id,
          publisherName: `${data.firstName} ${data.lastName}`,
        },
      };
      setFormData({ ...formData, ...publisherObj });
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch(`api/ministry/create/${publisher._id}`, {
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
      navigate("/finished");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="p-3 mx-w-lg max-w-xl mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">
        Relatório de Campo
      </h1>
      <form className="flex flex-col gap-5">
        <InputPhone
          disabled={auth}
          type="tel"
          id="phone"
          className="border p-3 rounded-lg"
          placeholder="Telefone com DDD (apenas números)"
          onChange={handleChange}
          value={formData.phone}
        />

        <button
          type="button"
          id="search"
          hidden={auth}
          disabled={loading}
          onClick={handleSearchPublisher}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Buscando..." : "Pesquisar"}
        </button>

        {auth && (
          <>
            <select
              id="month"
              className="border p-3 rounded-lg"
              onChange={handleChange}
            >
              <option value={lastMonth + 1}>{months[lastMonth]}</option>
              <option value={penultimateMonth + 1}>
                {months[penultimateMonth]}
              </option>
            </select>

            <fieldset className="flex flex-col gap-4 border p-3 rounded-lg ">
              <legend className="text-lg font-semibold">
                Participou no ministério?
                <div className="flex gap-3">
                  <Input
                    type="radio"
                    id="participated"
                    name="participated"
                    value={participated}
                    onChange={handleChange}
                    className="cursor-pointer"
                  />
                  <label
                    htmlFor="participated"
                    className="flex gap-3 cursor-pointer font-normal "
                  >
                    Sim
                  </label>
                </div>
                <div className="flex gap-3">
                  <Input
                    id="notParticipated"
                    name="participated"
                    type="radio"
                    className="cursor-pointer"
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="notParticipated"
                    className="flex gap-3 cursor-pointer font-normal "
                  >
                    Não
                  </label>
                </div>
              </legend>
            </fieldset>
          </>
        )}

        {auth && participated && publisher?.privilege !== "publicador" && (
          <Input
            type="text"
            id="hour"
            className="border p-3 rounded-lg"
            placeholder="Horas"
            onChange={handleChange}
            value={formData.name}
          />
        )}
        {auth && participated && (
          <>
            <Input
              type="text"
              id="study"
              className="border p-3 rounded-lg"
              placeholder="Estudos"
              onChange={handleChange}
              value={formData.name}
            />

            <label htmlFor="description" className="ml-3">
              Observações
            </label>
            <textarea
              id="description"
              className="border p-3 rounded-lg resize-none h-40"
              onChange={handleChange}
              value={formData.description}
            ></textarea>
          </>
        )}

        {error && <p className="text-red-500 my-3 text-center">{error}</p>}
        {auth && (
          <button
            type="submit"
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
            onClick={handleSubmit}
          >
            {loading ? "Carregando..." : "Enviar"}
          </button>
        )}
      </form>
    </div>
  );
};

export default Report;
