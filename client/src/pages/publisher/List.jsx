import React from "react";

import PublisherList from "../../components/PublisherList";

const List = () => {
  return (
    <div>
      <h1 className="mb-2 text-center font-bold text-slate-700 p-5 text-sm sm:text-xl ">
        Lista de publicadores
      </h1>
      <PublisherList
        publishers={{ firstname: "Robson", lastname: "Messias" }}
      />
      <PublisherList publishers={{ firstname: "Tais", lastname: "Cristina" }} />
    </div>
  );
};

export default List;
