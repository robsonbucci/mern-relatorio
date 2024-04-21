import React from "react";
import { useSelector } from "react-redux";

import PublisherList from "../../components/PublisherList.jsx";

const List = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [publishers, setPublishers] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/user/publishers/${currentUser._id}`);
        if (!response.ok) {
          throw new Error("Erro ao carregar os publicadores.");
        }
        const data = await response.json();
        // setPublishers(data.result);
        const sortedPublishers = data.result.sort((a, b) =>
          a.firstName.localeCompare(b.firstName),
        );
        setPublishers(sortedPublishers);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [currentUser._id]);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl mx-auto m-5">Lista de Publicadores</h1>

      {publishers.map((publisher) => (
        <PublisherList
          key={publisher._id}
          firstname={publisher.firstName}
          lastname={publisher.lastName}
        />
      ))}
    </div>
  );
};

export default List;
