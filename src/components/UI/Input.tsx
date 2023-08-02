import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  className?: string;
  name: string;
  value: string;
  onChange: () => void;
}

const Input: React.FC<InputProps> = ({ id, className, name, value, onChange }) => {
  return <input id={id} className={className} name={name} value={value} onChange={onChange} />;
};

export default React.memo(Input);
