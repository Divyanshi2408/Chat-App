import React,{useState} from 'react'
import { useAppStore } from '@/store'
import {useNavigate} from 'react-router-dom'
import {IoArrowBack} from 'react-icons/io5'
import {Avatar, AvatarImage} from "@/components/ui/avatar"
import { getColor } from '@/lib/utils'
import {FaPlus, FaTrash} from 'react-icons/fa'

const Profile = () => {
  const navigate = useNavigate();
  const {userInfo,setUserInfo} = useAppStore();
  const [firstName, setFirstName] = useState(userInfo.firstName);
  const [lastName, setLastName] = useState(userInfo.lastName);
  const [image, setImage] = useState(userInfo.image);
  const [hovered,setHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#000000');

  const saveChanges = async () => {
  }
  return (
    <div className='bg-[#1b1c24] h-[100vh] flex items-center justify-center flex-col gap-10'>
    <div className='flex flex-col gap-10 w-[80vw] md:w-max'>
      <IoArrowBack className='text-4xl lg:text-6xl text-white/90 cursor-pointer'></IoArrowBack>

    <div className='grid grid-cols-2'>
    <div
     className='h-full w-32 md:w-48 relative flex items-center justify-center'
     onMouseEnter={()=> setHovered(true)}
     onMouseLeave={()=> setHovered(false)}
     >
     <Avatar className='w-32 h-32 md:w-48 md:h-48 bg-gray-500 rounded-full overflow-hidden'>
      {
        image ? (
          <AvatarImage
          src={image}
          alt="Avatar"
          className='w-full h-full object-cover bg-black'
          />
        ) : (
          <div className={'uppercase h-32 w-32 md:w-48 text-5xl border-[1px] flex item-center justify-center rounded-full ${getColor(selectedColor)}'}>
         
          {firstName
          ? firstName.split("").shift()
          :userInfo.email.split("").shift()}

          </div>
        )
      }
     </Avatar>
     {hovered && (
      <div className='absolute insert-8 flex items-center justify-center bg-black/50 '>
        <label htmlFor="file-upload" className='cursor-pointer'>
          <FaPlus className='text-white text-2xl'/>
        </label>
        <input
          type="file"
          id="file-upload"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                setImage(reader.result);
              };
              reader.readAsDataURL(file);
            }
          }}
          className='hidden'
        />
      </div>
     )}
    </div>
    </div>
    </div>
    </div>

  )
}

export default Profile