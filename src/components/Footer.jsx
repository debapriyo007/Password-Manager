import React from 'react'

const Footer = () => {
  return (
    <div className="bg-black text-white flex flex-col justify-center items-center fixed bottom-0 w-full">

    <div className="logo font-bold text-white text-2xl">
      <span className="text-green-500">&lt;</span>
      Pass
      <span className="text-green-500">OP/&gt;</span>
    </div>


    <div className=" text-sm flex justify-center items-center font-thin">Create with 
    <img  width={20} src="https://cdn-icons-png.freepik.com/512/9336/9336195.png" alt="Love_Img" />
     by Debu</div>
  </div>
  )
}

export default Footer