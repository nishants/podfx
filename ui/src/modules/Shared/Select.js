import React from 'react';

const Select = ({values, onChange, value, nullValue=null}) => {
  const options = values.map(option => {
    return (
      <option
        // selected={value.name === option.name}
        key={option.name}
        value={option.name}>{option.name}</option>
    );
  });

  const setSelectedOption = (event) => {
    const value = values.find(option => option.name === event.currentTarget.value);
    onChange(value);
  };

  const selectRef = React.useRef(null);

  //reset when option list changes
  React.useEffect(() => {
    selectRef.current.value= "$_selected-no_option_$";
    onChange(nullValue);
  }, [values]);

  return (
    <div>
      <select
        ref={selectRef}
        onChange={setSelectedOption}>
        <option disabled value="$_selected-no_option_$"> -- select -- </option>
        {options}
      </select>
    </div>
  );
}

export default Select;
