import React, { useEffect, useRef, useState } from "react";
import { RiApps2AddFill } from "react-icons/ri";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { FaCopy } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { AiOutlineFileSearch } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";
import toast from "react-hot-toast";
// import { ToastContainer, toast } from 'react-toastify';

const Manager = () => {
  //To make password visible need useRef

  //this is need for get the form data
  const [form, Setform] = useState({ site: "", username: "", password: "" });
  //this is need for save the password.
  const [passwordArray, SetpasswordArray] = useState([]);

  useEffect(() => {
    let password = localStorage.getItem("password");
    if (password) {
      SetpasswordArray(JSON.parse(password));
    }
  }, []);

  //to fetch the input field data and get the elements
  const handleChange = (e) => {
    Setform({ ...form, [e.target.name]: e.target.value });
  };


  //to show the password
  const [passwordData, setpasswordData] = useState('')
  const [visiblePassword, setvisiblePassword] = useState(false)

  const handleInput = (e)=>{
    setpasswordData(e.target.value)
  }

  const handleShowPassword = () => {
    // alert("Need to implement the function");
    setvisiblePassword(!visiblePassword)
  };

  //to copy the text
  const copyText = (text) => {
    // alert('Need to implement Copy function')
    toast.success("Copied Successfully!");
    navigator.clipboard.writeText(text); //this is the main code
  };

  //edit password
  const editPassword = (id) => {
    // alert('Need to implement Edit function')
    Setform(passwordArray.filter((i) => i.id === id)[0]);
    SetpasswordArray(passwordArray.filter((items) => items.id != id));
  };
  //delete password
  const deletePassword = (id) => {
    // alert('Need to implement Delete function')
    let c = confirm("Are you sure to delete this password?");
    if (c) {
      SetpasswordArray(passwordArray.filter((items) => items.id != id));
      localStorage.setItem(
        "password",
        JSON.stringify(passwordArray.filter((items) => items.id != id))
      );
    }
    toast.success("Deleted Successfully!");
  };

  const savePassword = () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      // console.log(form)
      SetpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      //now i save my all details in localStorage
      localStorage.setItem(
        "password",
        JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      );
      // console.log([...passwordArray, form])
      Setform({ site: "", username: "", password: "" }); //when my all details are saved i reset my form

      toast.success("Saved Successfully!");
    } else {
      toast.error("All fields are required!");
    }
  };

  const maskPassword = (password) => {
    let maskedPassword = "";
    for (let i = 0; i < password.length; i++) {
      maskedPassword += '•';
    }
    return maskedPassword;
    // return '•'.repeat(password.length);
  }

  // const maskPassword = (password) => {
  //   if (password.length <= 1) {
  //     return password; // If the password has only one character, show it as is.
  //   }
  //   return password[0] + '•'.repeat(password.length - 1);
  // };

  return (
    <>
      {/* This is the BackGround theam */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-slate-800 opacity-20 blur-[100px]"></div>
      </div>

      {/* <!-- main container --> */}

      <div className="p-2 mt-5 md:mycontainer md:mt-0">
        <h1 className="text-4xl text-center font-bold">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">OP/&gt;</span>
        </h1>

        <p className="text-center mt-2 text-md  pb-2 ">Your own password manager</p>

        <div className="flex flex-col p-4 items-center gap-8 text-black">
          {/* My first Input tag */}
          <input
            className="w-full px-4 py-2 border outline-none border-black rounded-md"
            type="text"
            placeholder="Enter the website URL"
            value={form.site}
            onChange={handleChange}
            name="site"
          />

          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input
              type="text"
              placeholder="Enter website Username"
              className="w-full px-4 py-2 border outline-none border-black rounded-md"
              value={form.username}
              onChange={handleChange}
              name="username"
            />

            <div className="flex relative">
              <input
                type= {visiblePassword ? "text" :"password"}
                className="w-full px-4 py-2 border outline-none border-black rounded-md"
                placeholder="Enter Password"
                value={form.password}
                onChange={handleChange}
                name="password"
              />
              <span className="absolute right-[5px] top-[11px] cursor-pointer">
                {/* <IoEyeOutline onClick={showPassword} size={18} /> */}
                {
                  visiblePassword ? (
                  <IoEyeOutline onClick={handleShowPassword} size={18} />
                  ):(
                    <IoEyeOffOutline onClick={handleShowPassword} size={18} />
                  )
                }
              </span>
            </div>
          </div>

          <button
            className="flex justify-center items-center bg-green-400 rounded-md px-7 py-3 w-fit hover:bg-green-300 gap-2 border border-green-900"
            onClick={savePassword}
          >
            <RiApps2AddFill size={23} />
            Add Password
          </button>
        </div>

        {/* Show all the password as a table here */}
        <div className="passwords">
          <h2 className="text-center text-2xl py-5 font-bold ">
            Your Passwords 
          </h2>
          {passwordArray.length == 0 && (
            <div className=" flex justify-center font-bold text-md pt-14">
              {" "}
              <AiOutlineFileSearch size={100} />{" "}
            </div>
          )}

          <div className="overflow-x-auto ">

          
          {/* If password length is't 0 create the table and show the info */}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
              {/* This is Table Head */}
              <thead className="text-white bg-slate-900">
                <tr>
                  <th className="py-2">Site URL</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>

              {/* Now make table Body */}
              <tbody className="bg-slate-100">
                {passwordArray.map((items, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-center border  py-2">
                        <div className="flex items-center justify-center gap-2">
                          <a
                            className="cursor-pointer"
                            target="_blank"
                            href={items.site}
                          >
                            {items.site}
                          </a>
                          <div
                            className="size-7 cursor-pointer"
                            onClick={() => {
                              copyText(items.site);
                            }}
                          >
                            <FaCopy size={22} />
                          </div>
                        </div>
                      </td>

                      {/* Second table info */}
                      <td className="text-center border  py-2">
                        <div className="flex items-center justify-center gap-2">
                          {items.username}
                          <div
                            className="size-7 cursor-pointer"
                            onClick={() => {
                              copyText(items.username);
                            }}
                          >
                            <FaCopy size={22} />
                          </div>
                        </div>
                      </td>

                      {/* Third table info */}
                      <td className="text-center border  py-2">
                        <div className="flex items-center justify-center gap-2">
                          {maskPassword (items.password)}
                          <div
                            className="size-7 cursor-pointer"
                            onClick={() => {
                              copyText(items.password);
                            }}
                          >
                            <FaCopy size={22} />
                          </div>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="text-center  border  py-2">
                        <div className="flex items-center justify-center gap-2">
                          <span
                            className="text-center mx-1 cursor-pointer"
                            onClick={() => {
                              editPassword(items.id);
                            }}
                          >
                            <FaEdit size={23} />
                          </span>

                          <span
                            className="text-center mx-1 cursor-pointer"
                            onClick={() => {
                              deletePassword(items.id);
                            }}
                          >
                            <MdDelete size={23} />
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          </div>
          {/* <button
            className="flex justify-center items-center bg-green-400 rounded-md px-5 py-1.5 w-fit hover:bg-green-300 gap-2 border border-green-900"
            onClick={savePassword}
          >
           
            Edit
          </button>
          <button
            className="flex justify-center items-center bg-green-400 rounded-md px-5 py-1.5 w-fit hover:bg-green-300 gap-2 border border-green-900"
            onClick={savePassword}
          >
           
            Delete
          </button> */}
          
        </div>
      </div>
    </>
  );
};

export default Manager;
