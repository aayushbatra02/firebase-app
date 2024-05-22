const checkEmailRegex = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const checkPasswordRegex = (password) => {
  let regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return regex.test(password);
};

const fromatString = (string) => {
  const words = string.split(/(?=[A-Z])/);
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
  const formattedString = capitalizedWords.join(" ");
  return formattedString;
};

export const authenticate = (fieldName, value, condition) => {
  fieldName = fromatString(fieldName);
  if (!value) {
    return `${fieldName} Required`;
  } else {
    switch (fieldName) {
      case "Email": {
        if (!checkEmailRegex(value)) {
          return `Invalid ${fieldName}`;
        } else {
          return null;
        }
      }
      case "Password": {
        if (!checkPasswordRegex(value) && condition !== "login") {
          return `min 8 letters, at least a special character, upper and lower case letters and a number`;
        } else {
          return null;
        }
      }
      case "Confirm Password": {
        if (!value[1]) {
          return `${fieldName} is required`;
        } else if (value[0] !== value[1]) {
          return `Password does not match`;
        } else {
          return null;
        }
      }
      default: {
        if (condition && value.length < condition) {
          return `${fieldName} must contain ${condition} characters`;
        } else {
          return null;
        }
      }
    }
  }
};
