// eslint-disable-next-line react/prop-types
const GenderCheckbox = ({ onChange, gender }) => {
  return (
    <div className="flex mt-1">
      <div className="form-control">
        <label className={`label gap-2 cursor-pointer`}>
          <span className="label-text text-gray-300">Male</span>
          <input
            type="radio"
            className="radio border-slate-700"
            value="male"
            onChange={onChange}
            checked={gender === "male"}
            id="gender"
          />
        </label>
      </div>
      <div className="form-control">
        <label className={`label gap-2 cursor-pointer`}>
          <span className="label-text text-gray-300">Female</span>
          <input
            type="radio"
            className="radio border-slate-700"
            value="female"
            onChange={onChange}
            checked={gender === "female"}
            id="gender"
          />
        </label>
      </div>
    </div>
  );
};

export default GenderCheckbox;
