"use client";
import React, { useState } from "react";
import { Input } from 'antd';
import { FilePlus,File } from "lucide-react"; 
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import logo from '@/app/styles/Logo.svg'
import Image from 'next/image'


export const Projects = () => {
    const [show,setShow]=useState(true)
    const showmenu=()=>{
        if(show==true)
            setShow(false)
        else
            setShow(true)
    }
    return (
        <div className="hamburgermenu " >
            <div className="flex row w-full justify-end main-side-bar ">
                <Image className='mr-28' src={logo} alt="ChatG6 Logo" width={100} height={50}  style={show? {display:'none'}:{display:'flex'}}/>
                <button onClick={showmenu} className="flex flex-col justify-center h-full" >
                    {
                    show?
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#52525b" className="bi bi-layout-sidebar-inset-reverse" viewBox="0 0 16 16">
                            <path d="M2 2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1zm12-1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2z"/>
                            <path d="M13 4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1z"/>
                        </svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#52525b" className="bi bi-layout-sidebar-inset" viewBox="0 0 16 16">
                          <path d="M14 2a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zM2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2z"/>
                          <path d="M3 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/>
                        </svg>
                    }
                </button>
            </div>

                
                <div className="list-projects" style={show? {display:'none'}:{display:'flex'}}>
                	<Input.Search
                      placeholder="input search text"
                      allowClear
                      className="search-input"
                      style={{
                        width: '100%',
                      }}
                    />
                    <button className="new-pro">
                        <FilePlus/>
                        <span className="ml-2">
                            New Project
                        </span>
                    </button>
                    <ol className="mt-4">
                        <li className="li-project-content">
                            <File stroke="#52525b"/>
                            <span className="ml-2">
                                Project1
                            </span>
                        </li>
                        <li className="li-project-content">
                            <File stroke="#52525b"/>
                            <span className="ml-2">
                                Project2
                            </span>
                        </li>
                    </ol>
                </div>


            
            
        </div>
    );
  }

  export default Projects;
