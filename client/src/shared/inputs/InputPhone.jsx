import React from "react";

const InputPhone = ({ value = "", ...rest }) => {
  return (
    <input
      placeholder="Telefone com DDD (apenas números)"
      maxLength={15}
      value={value}
      {...rest}
    />
  );
};
export default InputPhone;
