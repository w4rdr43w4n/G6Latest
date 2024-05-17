"use client";
import React, {FC} from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import { Switch } from "@/components/ui/switch"
import { Button } from '../ui/button';
import { MagicWandIcon ,UpdateIcon} from '@radix-ui/react-icons';
interface contextmenuprops {
  x:number,
  y:number,
  closeContextMenu:()=>void
}
const ContextMenu: FC<contextmenuprops> = ({x,y,closeContextMenu}) => {
    const ContextMenuRef=React.useRef<HTMLDivElement>(null)
    useOnClickOutside(ContextMenuRef,closeContextMenu)
  return (
    <div 
    className='absolute z-20' 
    style={{ top: `${y}px`, left: `${x}px`,border:'1px solid rgba(0,0,0,0.5)',borderRadius:'16px',backgroundColor:'white' ,width:'200px',height:'100px',display:'flex',flexDirection:'column',justifyContent:'space-around',alignItems:'start',}}
    ref={ContextMenuRef}
    onContextMenu={(e) => e.preventDefault()}
    >   
    <div className='contaxt-menu-correction'>
        <span>Correction Mode </span>
        <Switch className='correction-switch' />
    </div>
    <div className='contaxt-menu-btn-list'>
      <button className='flex row contaxt-menu-btn' >
        <span className='mr-2'>Auto-Complete</span>
        <MagicWandIcon className='h-6'/>
      </button>  
    </div>
    <div className='contaxt-menu-btn-list'>
      <button className='flex row contaxt-menu-btn' >
        <span className='mr-2 '>Rephrase</span>
        <UpdateIcon className='h-6'/>
      </button>      
    </div>
    </div>
  )
}

export default ContextMenu