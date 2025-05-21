/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 19 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// Internal Imports
import InputField from '../input/Input';

// Form Component
const Form = ({
  login,
  loading,
  previewImage,
  inputValue,
  onChange,
  onImageUpload,
  onSubmit,
}) => {
  return (
    <form className="space-y-5" onSubmit={onSubmit}>
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
          loading={loading}
          placeholder="Enter your username"
          value={inputValue.username}
          onChange={onChange}
        />
      )}

      <InputField
        label="Email"
        type="email"
        name="email"
        loading={loading}
        placeholder="you@example.com"
        value={inputValue.email}
        onChange={onChange}
      />

      <InputField
        label="Password"
        type="password"
        name="password"
        loading={loading}
        placeholder="••••••••"
        value={inputValue.password}
        onChange={onChange}
      />
      <button
        disabled={loading}
        className={`w-full mt-6 bg-teal-700 text-white py-3 px-4 rounded-lg hover:bg-teal-600 active:scale-[0.98] transform transition-all duration-200 font-semibold border-none flex items-center justify-center gap-2 cursor-pointer ${
          loading ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
        }`}
      >
        {loading ? (
          <>
            {/* <Loader className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" /> */}
            <svg
              width="800px"
              height="800px"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              class="hds-flight-icon--animation-loading"
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            >
              <g fill="#fff" fill-rule="evenodd" clip-rule="evenodd">
                <path
                  d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z"
                  opacity=".2"
                />

                <path d="M7.25.75A.75.75 0 018 0a8 8 0 018 8 .75.75 0 01-1.5 0A6.5 6.5 0 008 1.5a.75.75 0 01-.75-.75z" />
              </g>
            </svg>
            <span>{login ? 'Logging in...' : 'Signing up...'}</span>
          </>
        ) : (
          <span>{login ? 'Login' : 'Sign Up'}</span>
        )}
      </button>
    </form>
  );
};

// Export
export default Form;
