import React from 'react'

const Skelton = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-3'>
            {[0, 0, 0, 0, 0, 0].map((elem, id) => {
                return (
                    <div className="flex flex-col m-8 rounded shadow-md w-[20rem] sm:w-72 animate-pulse h-80">
                        <div className="h-48 rounded-t bg-gray-300"></div>
                        <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 bg-gray-50">
                            <div className="w-full h-6 rounded bg-gray-300"></div>
                            <div className="w-full h-6 rounded bg-gray-300"></div>
                            <div className="w-3/4 h-6 rounded bg-gray-300"></div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Skelton