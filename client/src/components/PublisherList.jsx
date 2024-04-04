import React from "react";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";

export default function PublisherList({ publishers }) {
  return (
    <div>
      <div className="flex justify-between items-center bg-gray-600 text-white py-3 px-4 rounded-md  gap-4 w-full max-w-2xl mx-auto mb-4 shadow-sm text-sm sm:text-lg ">
        <p className="font-primary">{`${publishers.firstname} ${publishers.lastname}`}</p>
        <div className="flex items-center  gap-4">
          <AiFillEdit className="text-x1 cursor-pointer" />
          <BsFillTrashFill className="text-x1 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
