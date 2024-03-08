import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({ isSecretary: false });
  const [error, setError] = React.useState(false);
  const [loaging, setLoaging] = React.useState(false);
  const [isSecretary, setIsSecretary] = React.useState(false);

  const handleChange = ({ target }) => {
    if (target.type === 'checkbox') {
      setIsSecretary(target.checked);
      setFormData({ ...formData, isSecretary: target.checked });
    } else {
      setFormData({ ...formData, [target.id]: target.value });
    }
  };
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoaging(true);
      const res = await fetch('api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoaging(false);
        return;
      }
      setLoaging(false);
      setError(null);

      navigate('/sign-in');
    } catch (error) {
      setLoaging(false);
      setError(error.message);
    }
  };

  return (
    <div className="p-3 mx-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Cadastro</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <fieldset className="flex flex-col gap-4 border p-3">
          <legend className="text-lg font-semibold">Informações Pessoais</legend>

          <input
            type="text"
            placeholder="Nome"
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
            placeholder="Telefone (11) 99999-9999"
            className="border p-3 rounded-lg"
            id="phone"
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Número da congregação"
            className="border p-3 rounded-lg"
            id="congregationId"
            onChange={handleChange}
          />
          <div className="border p-3 text-center font-semibold flex gap-4">
            <label className="cursor-pointer text-slate-700" htmlFor="isSecretary">
              Sou um secretário
            </label>
            <input
              type="checkbox"
              placeholder="Número da congregação"
              className="border p-3 rounded-lg"
              id="isSecretary"
              onChange={handleChange}
              checked={isSecretary}
            />
          </div>
        </fieldset>

        <fieldset className="flex flex-col gap-4 border p-3">
          <legend className="text-lg font-semibold">Informações de Acesso</legend>
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

        {error && <p className="text-red-500 my-3 text-center">{error}</p>}
        <button
          disabled={loaging}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loaging ? 'Carregando...' : 'Cadastrar'}
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
