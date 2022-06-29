// validate email using Regex
function isEmailValid(email) {
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (email.match(validRegex)) {
    return true;
  } else {
    return false;
  }
}

// validate phone using Regex
function isValidPhone(phone) {
  return /^\d{10}$/.test(parseInt(phone, 10));
}

// validate img base64 string using Regex
function isValidBase64(file) {
  return /^data:image\/(?:gif|png|jpeg|bmp|webp)(?:;charset=utf-8)?;base64,(?:[A-Za-z0-9]|[+/])+={0,2}/g.test(
    file
  );
}

module.exports = { isEmailValid, isValidPhone, isValidBase64 };
