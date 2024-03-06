import { useSelector } from 'react-redux';

export default function Profile() {
  const { currentUser } = useSelector(state => state.user);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <img
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center m-2"
          src={currentUser.avatar}
          alt="profile"
        />
        <input type="text" placeholder="username" className="border p-3 rounded-lg" id="username" />
        <input type="email" placeholder="email" className="border p-3 rounded-lg" id="email" />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
        />
        <button
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
        >
          Atualizar
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Deletar conta</span>
        <span className="text-red-700 cursor-pointer">Sair</span>
      </div>
    </div>
  );
}
