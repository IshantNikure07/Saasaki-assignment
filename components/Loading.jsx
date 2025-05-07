import { useAppContext } from '@/context/AppContext'
import React from 'react'

const Loading = () => {
    const {dark} = useAppContext()
    return (
        <div className={` ${dark ? "bg-black " : ""} flex justify-center items-center h-[100vh]`}>
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-t-orange-300 border-gray-200"></div>
        </div>
    )
}

export default Loading