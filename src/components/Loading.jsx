import React from 'react'

export function Loading() {
    return (
        <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-red-500 animate-bounce"></div>
            <div className="w-10 h-10 rounded-full bg-blue-500 mx-4 animate-ping"></div>
            <div className="w-10 h-10 rounded-full bg-lime-500 animate-bounce"></div>
        </div>
    )
}
