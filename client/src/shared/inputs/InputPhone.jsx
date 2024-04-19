import React from "react";

import formatPhoneNumber from "../../utils/phoneUtils";

const InputPhone = ({ id, onChange, value = "", ...rest }) => {
  const handleChange = (e) => {
    const newValue = formatPhoneNumber(e.target.value);
    if (onChange) {
      onChange({ target: { id, value: newValue } });
    }
  };

  return (
    <input
      type="tel"
      onChange={value !== undefined && handleChange}
      value={value}
      placeholder="Telefone com DDD (apenas números)"
      maxLength={15}
      {...rest}
    />
  );
};

export default InputPhone;
