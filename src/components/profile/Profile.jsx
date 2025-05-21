/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 21 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { doc, updateDoc } from 'firebase/firestore';
import { ArrowLeft, Camera } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';

// Internal Imports
import { db } from '../../lib/firebase';
import upload from '../../lib/upload';
import { useUserStore } from '../../lib/userStore';

// Profile Component
const Profile = ({ onBack }) => {
  const { currentUser, updateProfile } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState({
    file: null,
    url: currentUser?.profileImage || null,
  });
  const [username, setUsername] = useState(currentUser?.username || '');

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage({
        file,
        url: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) {
      toast.error('Username is required');
      return;
    }

    setLoading(true);
    try {
      let imageUrl = currentUser.profileImage;

      if (previewImage.file) {
        imageUrl = await upload(previewImage.file);
      }

      const updates = {
        username: username.trim(),
        profileImage: imageUrl,
      };

      // Update user profile
      await updateDoc(doc(db, 'users', currentUser.id), updates);

      updateProfile(updates);

      toast.success('Profile updated successfully');
      onBack();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-gradient-to-b from-gray-900/95 to-gray-800/95 backdrop-blur-md">
      <div className="flex items-center gap-5 p-5 border-b border-b-gray-700/50 bg-black/10 backdrop-blur-sm">
        <button
          onClick={onBack}
          className="hover:bg-gray-800/50 p-2 rounded-full transition-all duration-300"
        >
          <ArrowLeft className="w-6 h-6 text-teal-500 cursor-pointer" />
        </button>
        <h1 className="text-xl font-semibold">Edit Profile</h1>
      </div>
      <div className="flex-1 flex justify-center items-start overflow-y-auto">
        <div className="w-full max-w-md px-4 py-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="flex flex-col items-center gap-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden ring-2 ring-teal-500/20 ring-offset-2 ring-offset-gray-900">
                  <img
                    src={previewImage.url || './profile.png'}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <label className="absolute bottom-0 right-0 cursor-pointer bg-teal-600 p-2 rounded-full hover:bg-teal-500 transition-all duration-300 transform hover:scale-110 shadow-lg">
                  <Camera className="w-5 h-5" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    disabled={loading}
                  />
                </label>
              </div>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-teal-500">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-3 bg-black/20 rounded-lg border border-gray-700 focus:border-teal-500 outline-none transition-all duration-300 focus:ring-2 focus:ring-teal-500/20"
                  placeholder="Enter username"
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-teal-500">
                  Email
                </label>
                <input
                  type="email"
                  value={currentUser?.email}
                  className="w-full p-3 bg-black/20 rounded-lg border border-gray-700 text-gray-400 cursor-not-allowed"
                  disabled
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full mt-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                loading
                  ? 'bg-gray-700/50 backdrop-blur-sm cursor-not-allowed'
                  : 'bg-teal-600/90 hover:bg-teal-500/80 backdrop-blur-sm transition-colors cursor-pointer'
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Updating...</span>
                </div>
              ) : (
                'Update Profile'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Export
export default Profile;
