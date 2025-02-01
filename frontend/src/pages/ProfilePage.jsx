import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Camera } from 'lucide-react';

function ProfilePage() {

  const {authUser, isUpdatingProfile, updateProfile} = useAuthStore();
  const [selectedImage, setSelectedImage]  = useState(null);

  const handleImageUpload = async(e)=>{
    const file = e.target.files[0];
    if(!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload =async()=>{
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      await updateProfile({profilePic:base64Image});
    }
  };



  return (
    <div className='h-screen mt-5 p-2 md:p-5 lg:p-20'>
      <div className='max-w-xl mx-auto p-4 py-8'>
        <div className='bg-base-300 rounded-xl p-4 space-y-4'>

          <div className='flex flex-col items-center gap-4'>
            <div className='relative'>
              <img src={selectedImage || authUser.profilePic || "/avatar.png"} alt="Profile"
              className='size-32 rounded-full border-4' />
              <label htmlFor='avatar-upload'
              className={`absolute bottom-0 right-0 bg-base-content 
                          hover:scale-105 p-2 rounded-full cursor-pointer 
                          transition-all duration-200
              ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""} `}>
              <Camera className='size-5 text-gray-800'/>
              <input type="file" id='avatar-upload' className='hidden' accept='image/*' onChange={handleImageUpload} disabled={isUpdatingProfile}/>
              </label>
            </div>
            <p className='text-sm text-zinc-400'>
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className='space-y-6'>
            <div className='space-y-1.5'>
              <div className='text-sm text-zinc-400 flex items-center gap-2'>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path
                  d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              Full Name
              </div>
              <p className='px-4 py-2.5 bg-base-200 rounded-lg border'>{authUser?.fullname}</p>
            </div>
            <div className='space-y-1.5'>
              <div className='text-sm text-zinc-400 flex items-center gap-2'>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path
                  d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path
                  d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              Email 
              </div>
              <p className='px-4 py-2.5 bg-base-200 rounded-lg border'>{authUser?.email}</p>
            </div>
          </div>

          <div className='mt-4 bg-base-300 rounded-xl p-4'>
            <h2 className='text-lg font-medium mb-4'>Account Info</h2>
            <div className='space-y-3 text-sm'>
              <div className='flex items-center justify-between py-2 border-b border-zinc-700'>
                <span>Joined</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className='flex items-center justify-between py-2'>
                <span>Account Status</span>
                <span className='text-primary'>Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default ProfilePage