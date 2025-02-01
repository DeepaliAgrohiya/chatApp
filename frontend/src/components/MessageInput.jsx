import { Send, X } from 'lucide-react';
import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { useChatStore } from '../store/useChatStore';
import { Image } from 'lucide-react';

function MessageInput() {
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    const {sendMessage} = useChatStore();

    const handleImageChange = (e)=>{
        const file = e.target.files[0];

        if(!file.type.startsWith("image/")){
            toast.error("Please select an image. Other files are not supported yet!");
            return;
        }

        const reader = new FileReader();
        reader.onloadend =()=>{
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const removeImage = ()=>{
        setImagePreview(null);
        if(fileInputRef.current) fileInputRef.current.value="";
    };

    const handleSendMessage = async(e)=>{
        e.preventDefault();
        if(!text.trim() && !imagePreview) return;

        try {
            await sendMessage({
                text:text.trim(),
                image:imagePreview,
            });
            setText("");
            setImagePreview(null);
            if(fileInputRef.current) fileInputRef.current.value="";
        } catch (error) {
            toast.error("Failed to send message")
        }
    }
  return (
    <div className='p-4 w-full '>
        {imagePreview && (
            <div className='mb-3 flex items-center  gap-2'>
                <div className='relative'>
                    <img src={imagePreview} alt="Preview" 
                    className='size-20 object-cover rounded-lg border border-zinc-700'/>

                    <button onClick={removeImage}
                    className='absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center'
                    type='button'>
                        <X className='size-3'/>
                    </button>
                </div>
            </div>    
        )}
        <form onSubmit={handleSendMessage}
        className='flex items-center gap-2 '>
            <div className='flex-1 flex items-center gap-2'>
                <input type="text"
                className='w-full input input-bordered rounded-lg input-sm sm:input-md'
                placeholder='Write some message...'
                value={text} 
                onChange={(e)=>setText(e.target.value)}/>

                <input type="file"
                className='hidden'
                accept='image/*'
                ref={fileInputRef}
                onChange={handleImageChange} />

                <button type='button'
                className={`flex items-center justify-center btn-circle  ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
                onClick={()=>fileInputRef.current?.click()}>
                    <Image size={20}/>
                </button>
            </div>

            <button type='submit'
            className='btn btn-sm md:btn-md btn-circle btn-primary'
            disabled={!text.trim() && !imagePreview}>
                <Send size={20}/>
            </button>
        </form>

    </div>
  )
}

export default MessageInput