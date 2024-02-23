const InputForm = ({ label, placeholder, type, name,pattern,errorMessage,defaultValue }) => {
  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text capitalize">{label}</span>
      </div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="input input-bordered w-full max-w-xs"
        pattern={pattern}
        required
        defaultValue={defaultValue}
      />
      <span>{errorMessage}</span>
    </label>
  );
};
export default InputForm;
