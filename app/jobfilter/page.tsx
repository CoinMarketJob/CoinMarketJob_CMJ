//import "jobFilter.css"
"use client"
import JobFilterModal  from "./jobFilterModal"
import JobFilter from "./Job";
import { useState } from "react";
function JobFilterPopUp(){
    return (
        <div className="filter-group">
            <JobFilterModal>
                <div>
                    <JobFilter/>
                </div>
            </JobFilterModal>
        </div>    
        
    );
}
export default JobFilterPopUp;