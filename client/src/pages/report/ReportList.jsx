import React from "react";
import { useSelector } from "react-redux";

const RepotList = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [month, setMonth] = React.useState("");
  const [year, setYear] = React.useState("");
  const [reports, setReports] = React.useState([]);

  const fetchReports = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `/api/ministry/super/list/${currentUser._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            month: 2,
            year: 2024,
          }),
        },
      );

      const data = await response.json();

      if (data.success === false) {
        console.error(data.message);
        return;
      }

      setReports(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl mx-auto m-5">Lista de Relatórios</h1>
      <div className="flex flex-col mx-auto">
        <div className="flex gap-2">
          <label htmlFor="month" className="self-center">
            Mês:
          </label>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          >
            <option value="">Selecione o mês</option>
            <option value="1">Janeiro</option>
            <option value="2">Fevereiro</option>
            {/* Adicione mais meses conforme necessário */}
          </select>

          <label htmlFor="year" className="self-center">
            Ano:
          </label>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          >
            <option value="">Selecione o ano</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            {/* Adicione mais anos conforme necessário */}
          </select>
          <button
            onClick={fetchReports}
            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Buscar relatórios
          </button>
        </div>
      </div>

      <div className="overflow-x-auto mx-5">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome do Publicador
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Horas
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                LDC
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estudos
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Observações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reports.map((report) => (
              <tr key={report._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {report.publisher.publisherName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{report.hour}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {report.ldcHour || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{report.study}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {report.observation}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RepotList;
