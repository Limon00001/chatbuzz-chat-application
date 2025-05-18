/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 18 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

// Input Component
const InputField = ({
  label,
  type = 'text',
  name = '',
  placeholder = '',
  value,
  onChange,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPasswordType = type === 'password';

  const inputType = isPasswordType && isPasswordVisible ? 'text' : type;

  return (
    <div className="flex flex-col">
      <label className="block mb-1 text-white/80">{label}</label>
      <div className="relative flex items-center">
        <input
          type={inputType}
          className="w-full px-4 py-2 border border-white/30 bg-white/20 text-white placeholder-white/70 rounded-lg focus:outline-none"
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {isPasswordType && (
          <div
            className="absolute right-3 cursor-pointer text-white"
            onClick={() => setIsPasswordVisible((prev) => !prev)}
          >
            {isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default InputField;
