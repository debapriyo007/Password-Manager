import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-black text-white'>
        <div className='mycontainer flex justify-between items-center
        px-4 h-14 py-7'>
            {/* for logo */}
            <div className='text-2xl font-bold cursor-pointer'>
                <span className='text-green-500'>&lt;</span>
                Pass
                <span className='text-green-500'>OP/&gt;</span>
            </div>
            {/* for buttons */}
            <a target='_blank' href="https://github.com/debapriyo007">
                <button className='bg-green-700 flex my-5 justify-between
                rounded-full items-center ring-white ring-1'>
                    <img className='invert-1 w-11 p-1' src="/icons/github-mark.svg" alt="GitHub" />
                    <span className='font-bold px-2'>GitHub</span>
                </button>
            </a>
        </div>
    </nav>
  )
}

export default Navbar