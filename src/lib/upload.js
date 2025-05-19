/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 19 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

const upload = async (file) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  if (!file) throw new Error('No file provided');

  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'chat_app_unsigned');
    formData.append('cloud_name', cloudName);

    // Make the API request
    // Note: The URL should be the Cloudinary base URL
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      },
    );

    if (!response.ok) {
      throw new Error(data.error?.message || 'Upload failed');
    }

    const data = await response.json();

    if (data?.error) {
      throw new Error(data?.error?.message);
    }

    return data?.secure_url;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

// Export
export default upload;
