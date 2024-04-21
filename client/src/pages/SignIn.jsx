import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice.js";

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({});
  const { error, loaging } = useSelector((state) => state.user);

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.id]: target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/publisher/list");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="p-3 mx-w-lg max-w-xl mx-auto">
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
          {loaging ? "Carregando..." : "Entrar"}
        </button>
      </form>
      <div className="flex mt-5 gap-2">
        <p>Não possui uma conta?</p>
        <Link to="/sign-up">
          <span className="text-blue-700">Registrar</span>
        </Link>
      </div>
    </div>
  );
}
