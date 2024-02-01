const SubmitBtn = ({ text }) => {
  return (
    <button
      type="submit"
      className="btn btn-primary btn-block"
    >
      {text || "Submit"}
    </button>
  );
};
export default SubmitBtn;
