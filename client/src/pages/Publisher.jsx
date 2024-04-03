import React from 'react';
import { useSelector } from 'react-redux';

export default function Publisher() {
  const { currentUser } = useSelector(state => state.user);
  const [formData, setFormData] = React.useState({ privilege: 'publicador' });

  const handleChange = event => {
    const { value, checked, type, id } = event.target;
    if (type === 'radio') {
      setFormData(prev => ({
        ...prev,
        privilege: value,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [id]: type === 'checkbox' ? checked : value,
        adminId: currentUser._id,
      }));
    }
  };
  console.log('🚀  handleChange  formData:', formData);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('api/publisher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto font-semibold">
      <h1 className="text-3xl font-semibold text-center my-7">Cadastro de Publicadores</h1>
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
          placeholder="Telefone (11) 99999-9999"
          className="border p-3 rounded-lg"
          id="phone"
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
          <legend className="text-lg font-semibold">Selecione o Privilégio</legend>
          <div className="flex gap-4">
            <input
              onChange={handleChange}
              checked={formData.privilege === 'publicador'}
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
              checked={formData.privilege === 'auxiliar'}
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
              checked={formData.privilege === 'regular'}
              type="radio"
              name="privilege"
              id="regular"
              value="regular"
            />
            <label htmlFor="regular">Pioneiro regular</label>
          </div>
        </fieldset>

        <button
          type="submit"
          className="bg-slate-700 text-white p-3 mt-3 rounded-lg uppercase hover:opacity-95"
        >
          cadastrar
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">listar Publicadores</span>
        <span className="text-red-700 cursor-pointer">Cancelar</span>
      </div>
    </div>
  );
}
