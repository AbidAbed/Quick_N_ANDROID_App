function usePhoneNumberValidator(state, value) {
  if (value.length === 0) return `${state} should not be empty`;
  else if (!/^(07)[0-9]{8}$/.test(value))
    return "Please enter a valid phone number starting with '07' and being 10 numbers";
  else return '';
}
export default usePhoneNumberValidator;
