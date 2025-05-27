import React, { useState } from 'react';
import { useAppStore } from '@/store';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { colors, getColor } from '@/lib/utils';
import { FaPlus, FaTrash } from 'react-icons/fa';

const Profile = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAppStore();
  const [firstName, setFirstName] = useState(userInfo.firstName);
  const [lastName, setLastName] = useState(userInfo.lastName);
  const [image, setImage] = useState(userInfo.image);
  const [hovered, setHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#000000');

  const saveChanges = async () => {
    // Save logic here
  };

  const handleImageToggle = () => {
    if (image) {
      setImage('');
    } else {
      // handle upload logic here
    }
  };

  return (
    <div className="bg-[#1b1c24] min-h-screen flex items-center justify-center flex-col gap-10 py-10">
      <div className="flex flex-col gap-10 w-[90vw] max-w-4xl">
        <IoArrowBack
          onClick={() => navigate(-1)}
          className="text-4xl lg:text-5xl text-white/90 cursor-pointer"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Avatar Section */}
          <div
            className="w-full relative flex items-center justify-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Avatar className="w-32 h-32 md:w-48 md:h-48 bg-gray-500 rounded-full overflow-hidden">
              {image ? (
                <AvatarImage
                  src={image}
                  alt="Avatar"
                  className="w-full h-full object-cover bg-black"
                />
              ) : (
                <div
                  className={`uppercase text-5xl flex items-center justify-center w-full h-full ${getColor(selectedColor)} rounded-full`}
                >
                  {firstName
                    ? firstName.charAt(0)
                    : userInfo.email.charAt(0)}
                </div>
              )}
            </Avatar>

            {hovered && (
              <div
                className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer"
                onClick={handleImageToggle}
              >
                {image ? (
                  <FaTrash className="text-white text-3xl" />
                ) : (
                  <FaPlus className="text-white text-3xl" />
                )}
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="flex flex-col gap-5 text-white w-full">
            <div>
              <label className="text-sm mb-1 block">Email</label>
              <input
                placeholder="Email"
                type="email"
                disabled
                value={userInfo.email}
                className="w-full rounded-lg p-4 bg-[#2c2e3b] border-none"
              />
            </div>
            <div>
              <label className="text-sm mb-1 block">First Name</label>
              <input
                placeholder="First Name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full rounded-lg p-4 bg-[#2c2e3b] border-none text-white"
              />
            </div>
            <div>
              <label className="text-sm mb-1 block">Last Name</label>
              <input
                placeholder="Last Name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full rounded-lg p-4 bg-[#2c2e3b] border-none text-white"
              />
            </div>

           

          <div className='w-full flex gap-5'>
            {colors.map((_, index) => (
              <div
                key={index}
                className={`h-8 w-8 rounded-full cursor-pointer transition-all duration-300 ${getColor(index)} ${
                  selectedColor === index ? "outline outline-white outline-2" : ""
                }`}
                onClick={() => setSelectedColor(index)}
              />
            ))}
          </div>


            <button
              onClick={saveChanges}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
