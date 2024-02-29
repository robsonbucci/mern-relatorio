import { Link } from 'react-router-dom';
export default function Header() {
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
            <li className="hidden sm:inline text-slate-700 hover:underline">Home</li>
          </Link>
          <Link to="/about">
            <li className="text-slate-700 hover:underline">Sobre</li>
          </Link>
          <Link to="/signin">
            <li className="text-slate-700 hover:underline">Entrar</li>
          </Link>
        </ul>
      </div>
    </header>
  );
}
