import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({});
  const [error, setError] = React.useState(false);
  const [loaging, setLoaging] = React.useState(false);
  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.id]: target.value });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoaging(true);
      const res = await fetch('api/auth/signin', {
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
      navigate('/');
    } catch (error) {
      setLoaging(false);
      setError(error.message);
    }
  };

  return (
    <div className="p-3 mx-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Entrar</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        {error && <p className="text-red-500 my-3 text-center">{error}</p>}
        <button
          disabled={loaging}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loaging ? 'Carregando...' : 'Entrar'}
        </button>
      </form>
      <div className="flex mt-5 gap-2">
        <p>Não possui uma conta?</p>
        <Link to="/signup">
          <span className="text-blue-700">Registrar</span>
        </Link>
      </div>
    </div>
  );
}
