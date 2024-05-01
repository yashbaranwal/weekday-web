export const reactSelectStyle = {
    control: (provided) => ({
      ...provided,
        fontSize: "12px",
    }),
    input: (provided) => ({
      ...provided,
      minWidth: "80px",
    }),
    placeholder: (provided) => ({
        ...provided,
        color: "#959499"
      }),
    option: (provided) => ({
        ...provided,
        fontSize: 12
      })
  };
  