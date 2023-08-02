import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  className?: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ id, className, name, value, onChange, ...rest }) => {
  return <input id={id} className={`h-10 px-4`} name={name} value={value} onChange={onChange} {...rest} />;
};

export default React.memo(Input);
