/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 19 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// Left section - Banner Component
const Banner = () => {
  return (
    <section className="w-1/2 relative hidden md:flex items-center justify-center bg-cover bg-center">
      <div className="absolute inset-0"></div>
      <div className="relative z-10 text-white text-center px-6">
        <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
        <p className="text-lg opacity-90">
          <span className="text-teal-400">Let's start a conversation.</span>{' '}
          Stay focused, stay inspired.
        </p>
      </div>
    </section>
  );
};

// Export
export default Banner;
