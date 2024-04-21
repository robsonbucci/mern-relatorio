import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl">
            <span className="text-slate-500 ">Relatório </span>
            <span> | </span>
            <span className="text-slate-700 ">Congregacional</span>
          </h1>
        </Link>

        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/publishers">
            <li className="text-slate-700 hover:underline">Publicadores</li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <li className="text-slate-700 hover:underline">Entrar</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
