/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 19 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// Internal Imports
import InputField from '../input/Input';

// Form Component
const Form = ({ login, previewImage, inputValue, onChange, onImageUpload }) => {
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {/* Image Upload Section */}
      {login ? null : (
        <div className="flex items-center space-x-5">
          {previewImage ? (
            <img
              src={
                previewImage.url ||
                'https://dummyimage.com/300x300/081518/90/fff&text=Image'
              }
              alt="Upload Image"
              className="w-24 h-24 object-cover rounded-full border-2 border-dashed border-white/50"
            />
          ) : (
            <div className="w-24 h-24 flex items-center justify-center rounded-full border-2 border-dashed border-white/40 text-white/60">
              No Image
            </div>
          )}
          <label className="text-sm text-white/80 cursor-pointer underline hover:text-white transition">
            Upload Profile Image
            <input
              type="file"
              accept="image/*"
              onChange={onImageUpload}
              className="hidden"
            />
          </label>
        </div>
      )}

      {login ? null : (
        <InputField
          label="Username"
          type="text"
          name="username"
          placeholder="Enter your username"
          value={inputValue.username}
          onChange={onChange}
        />
      )}

      <InputField
        label="Email"
        type="email"
        name="email"
        placeholder="you@example.com"
        value={inputValue.email}
        onChange={onChange}
      />

      <InputField
        label="Password"
        type="password"
        name="password"
        placeholder="••••••••"
        value={inputValue.password}
        onChange={onChange}
      />
      <button
        type="submit"
        className="w-full mt-6 bg-teal-700 text-white py-3 px-4 rounded-lg hover:bg-teal-600 active:scale-[0.98] transform transition-all duration-200 font-semibold border-none flex items-center justify-center gap-2 cursor-pointer"
      >
        <span>{login ? 'Login' : 'Sign Up'}</span>
      </button>
    </form>
  );
};

// Export
export default Form;
