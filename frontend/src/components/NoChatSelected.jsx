import React from 'react'
import { MessageSquare } from 'lucide-react'

function NoChatSelected() {
  return (
    <div className='w-full ml-16 md:ml-0 flex flex-1 flex-col items-center justify-center p-4  md:p-16 bg-base-100/50'>
      <div className='max-w-md text-center md:space-y-2 md:space-y-6'>

        {/* Message Icon */}
        <div className='flex justify-center gap-4 mb-4'>
          <div className='relative'>
            <div className='w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center animate-pulse'>
              <MessageSquare className='size-8 text-primary'/>
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className='text-2xl font-bold'>Welcome to Sendy</h2>
        <p className='text-base-content/60 '>Open a conversation right away!</p>
      </div>

    </div>
  )
}

export default NoChatSelected