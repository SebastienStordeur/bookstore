import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  className?: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ id, className, name, value, onChange, ...rest }) => {
  return (
    <div className="flex flex-col text-white my-2">
      <label htmlFor={name} className="text-lg font-semibold tracking-wide text-black">
        {name.toUpperCase()}
      </label>
      <input
        id={id}
        className={`h-14 px-4 border text-black rounded-md outline-none focus:border-red-200 focus:border-4`}
        name={name}
        value={value}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
};

export default React.memo(Input);
