/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 18 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

import { useState } from 'react';
import Banner from './banner/Banner';
import Form from './form/Form';

// Login Component
const Login = () => {
  const [login, setLogin] = useState(true);
  const [inputValue, setInputValue] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [previewImage, setPreviewImage] = useState({
    file: null,
    url: null,
  });

  // Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage({
        ...previewImage,
        file: file,
        url: URL.createObjectURL(file),
      });
    }
  };

  return (
    <section className="w-[100%] h-[100%] flex items-center justify-center gap-25">
      {/* Left Section */}
      <Banner />

      {/* Divider */}
      <div className="hidden md:block w-px h-[70vh] bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>

      {/* Right Section - Login */}
      <section className="w-full md:w-1/2 flex items-center justify-center p-10">
        <div className="w-full max-w-sm">
          <h2 className="text-3xl font-semibold mb-6 text-center text-white drop-shadow">
            {login ? 'Login to Your Account' : 'Create a New Account'}
          </h2>
          <Form
            login={login}
            previewImage={previewImage}
            inputValue={inputValue}
            onChange={handleChange}
            onImageUpload={handleImageUpload}
          />
          <p className="text-sm text-center mt-6 text-white/90">
            Don't have an account?{' '}
            <a
              href="#"
              className="text-white font-semibold underline"
              onClick={() => setLogin((prev) => !prev)}
            >
              {login ? 'Sign up' : 'Login'}
            </a>
          </p>
        </div>
      </section>
    </section>
  );
};

// Export
export default Login;
