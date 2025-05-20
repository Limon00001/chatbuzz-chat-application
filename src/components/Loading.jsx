/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 20 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// Loading Component
const Loading = ({ size = 'md', fullScreen = false }) => {
  // Size variants
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  const spinner = (
    <div className="flex items-center justify-center">
      <div
        className={`${sizes[size]} animate-spin rounded-full border-4 border-teal-500 border-t-transparent`}
        role="status"
        aria-label="loading"
      />
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm">
        {spinner}
      </div>
    );
  }

  return spinner;
};

// Export
export default Loading;
