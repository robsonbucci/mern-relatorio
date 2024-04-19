const formatPhoneNumber = (phoneNumberString) => {
  // Remove todos os caracteres não numéricos
  const cleaned = phoneNumberString.replace(/\D/g, "");

  // Verifica o tamanho do número para aplicar a formatação correta
  let format;
  if (cleaned.length === 11) {
    format = /^(\d{2})(\d{5})(\d{4})$/;
  } else if (cleaned.length === 10) {
    format = /^(\d{2})(\d{4})(\d{4})$/;
  } else {
    return cleaned;
  }

  const match = cleaned.match(format);
  return match ? `(${match[1]}) ${match[2]}-${match[3]}` : cleaned;
};

export default formatPhoneNumber;
