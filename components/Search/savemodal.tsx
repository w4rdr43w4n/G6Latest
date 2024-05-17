import React, { useRef, useEffect, ReactNode  } from 'react';
import "@/app/styles/srch_components.css"
interface ModalProps {
 onClose: () => void;
 children: ReactNode;
}

const Savemodal: React.FC<ModalProps> = ({ onClose, children }) => {

 return (
    <div className="modal">
      {children}
      <button id='btn' onClick={onClose}>Cancel</button>
    </div>
 );
};

export default Savemodal;
