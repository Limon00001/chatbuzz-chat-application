/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 18 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { toast } from 'react-toastify';

// Internal Imports
import { auth, db } from '../../lib/firebase';
import upload from '../../lib/upload';
import Banner from './banner/Banner';
import Form from './form/Form';

// Login Component
const Login = () => {
  const [login, setLogin] = useState(true);
  const [loading, setLoading] = useState(false);
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

  // Handle Registration
  const handleRegister = async (e) => {
    e.preventDefault();

    if (login) return;

    const { username, email, password } = inputValue;

    // Validate inputs
    if (!email || !password || !username) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      // Create authentication user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      let profileImageUrl = null;

      // Upload image if provided
      if (previewImage.file) {
        try {
          profileImageUrl = await upload(previewImage.file);
        } catch (error) {
          console.error('Error uploading image:', error);
          toast.error('Error uploading profile image');
        } finally {
          setLoading(false);
        }
      }

      // Create user document in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        username,
        email,
        id: userCredential.user.uid,
        profileImage: profileImageUrl, // image URL
        createdAt: new Date().toISOString(),
        blocked: [],
      });

      // Create user chats document
      await setDoc(doc(db, 'userchats', userCredential.user.uid), {
        chats: [],
      });

      toast.success('Registration successful! Please log in.');

      // Reset form
      setInputValue({
        username: '',
        email: '',
        password: '',
      });
      setPreviewImage({
        file: null,
        url: null,
      });

      // Switch to login mode
      setLogin(true);
    } catch (error) {
      console.error('Error during registration:', error);
      toast.error(error.message || 'Registration failed');
    }
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate inputs
    const { email, password } = inputValue;
    if (!email || !password) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Login successful!');
    } catch (error) {
      console.error('Error during login:', error);
      toast.error(error.message || 'Login failed');
    } finally {
      setLoading(false);
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
            loading={loading}
            previewImage={previewImage}
            inputValue={inputValue}
            onChange={handleChange}
            onImageUpload={handleImageUpload}
            onSubmit={login ? handleLogin : handleRegister}
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
