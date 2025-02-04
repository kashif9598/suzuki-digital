const validateInputData = (userData) => {
  let isValid = true;
  if (userData?.firstName.length > 50) {
    isValid = false;
  } else if (userData?.lastName.length > 50) {
    isValid = false;
  } else if (userData?.age < 18 && userData?.age > 100) {
    isValid = false;
  } else if (!/^\d{10}$/.test(userData?.mobile)) {
    isValid = false;
  } else if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(userData?.email)) {
    isValid = false;
  } else if (userData?.interest && userData?.interest.length < 1) {
    isValid = false;
  }

  return isValid;
};

export { validateInputData };
