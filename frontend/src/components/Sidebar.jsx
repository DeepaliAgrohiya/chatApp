import React, { useEffect } from 'react';
import { useChatStore } from '../store/useChatStore';
import SidebarSkeleton from './skeletons/SidebarSkeleton';
import { Users } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

function Sidebar() {
  const {users, getUsers, selectedUser, setSelectedUser, isUsersLoading} = useChatStore();
  const {onlineUsers} = useAuthStore();

  useEffect(()=>{
    getUsers();
    
  }, [getUsers]);

  if(isUsersLoading) return <SidebarSkeleton/>

  return (
<aside
  className={`fixed left-0 top-0 h-full w-16 md:w-20 lg:w-44 border-r border-base-300 flex flex-col transition-transform duration-300 ease-in-out ${
    selectedUser ? "-translate-x-full" : "translate-x-0"
  } md:relative md:translate-x-0`}
>
      <div className='border-b border-base-300 w-full p-5'>
        <div className='flex items-center gap-0 justify-center lg:gap-2 lg:justify-normal'>
          <Users className='size-6'/>
          <span className='hidden lg:block text-base-content'>Contacts</span>
        </div>

        {/* Online Filter Logo */}

      </div>
      <div className='overflow-y-auto w-full py-3'>
          {users.map((user)=>(
            <button
            key={user._id}
            onClick={()=>setSelectedUser(user)}
            className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors 
              ${selectedUser?._id === user._id ? "bg-base-300" : ""}`}>

              <div className='relative mx-auto lg:mx-0'>
                <img src={user.profilePic || "/avatar.png"} alt={user.name} 
                className='size-9 md:size-12 object-cover rounded-full'/>
                {onlineUsers.includes(user._id) && (
                  <span className='absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-500'/>
                )}
              </div>

              {/* User Info */}
              <div className='hidden lg:block text-left min-w-0'>
                <div className='font-medium truncate'>{user.fullname}</div>
                <div className='text-sm text-zinc-400'>
                  {onlineUsers.includes(user._id)? "Online": "Offline"}
                </div>
              </div>
              </button>
          ))}
      </div>

    </aside>
  )
}

export default Sidebar