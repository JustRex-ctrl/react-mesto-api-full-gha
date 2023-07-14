import { useState, useCallback } from 'react';

function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  function handleChange(e) {
    const { name, value, validationMessage } = e.target;
    setValues(values => ({...values,  [name]: value }));
    setErrors(errors => ({ ...errors, [name]: validationMessage}));
    setIsValid(e.target.closest('form').checkValidity());
  }

  const resetForm = useCallback(() => {
    setValues({});
    setErrors({});
    setIsValid(false);
  }, [setValues, setErrors, setIsValid]);

  return { values, errors, isValid, handleChange, resetForm, setValues };
}

export default useFormWithValidation;