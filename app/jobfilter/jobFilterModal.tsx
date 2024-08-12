
//import "jobFilterModal.css"
import React, {ReactNode} from 'react';
import JobFilter from "./Job";

const JobFilterModal: React.FC<{ children : ReactNode }> = ({ children}) => {
  return (
    <div className='modal-container'>
      <div className='modal'>
        <div className='modal-content'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default JobFilterModal;
