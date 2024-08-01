"use client";
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'; 
import JobCard from './JobCard';
import styles from './JobBoard.module.css';
import { Job } from '@prisma/client';
import { useJobs } from '@/hooks/useJobs';
import JobDetail from './JobDetail';

const JobBoard = () => {
  const { filteredJobs, setFilteredJobs } = useJobs();

  const [jobs, setJobs] = useState<Job[]>(filteredJobs);
  const [selectedJobs, setSelectedJobs] = useState<Array<Job>>([]);
  const [activeJob, setActiveJob] = useState<Job | undefined>(undefined);
  const [isDetailViewVisible, setIsDetailViewVisible] = useState(false);

  useEffect(() => {
    setJobs(filteredJobs);
  }, [filteredJobs]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const newJobs = Array.from(jobs);
    const [draggedItem] = newJobs.splice(result.source.index, 1);

    if (result.destination.droppableId === 'selectedList') {
      if (!selectedJobs.some(job => job.id === draggedItem.id)) {
        setSelectedJobs(prevSelected => [...prevSelected, draggedItem]);
      }
    } else {
      if (isDetailViewVisible) {
        newJobs.splice(result.destination.index, 0, draggedItem);
      }
    }

    setJobs(newJobs);

    if (!isDetailViewVisible) {
      setIsDetailViewVisible(true);
      setSelectedJobs([draggedItem]);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: isDetailViewVisible ? 2 : 1 }}>
          <Droppable droppableId="jobList">
            {(provided) => (
              <div 
                {...provided.droppableProps} 
                ref={provided.innerRef} 
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: isDetailViewVisible ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', 
                  gap: '16px' 
                }}
              >
                {jobs.map((job, index) => (
                  <Draggable key={job.id} draggableId={job.id.toString()} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style,
                          backgroundColor: snapshot.isDragging ? 'lightblue' : 'white',
                        }}
                      >
                        <JobCard job={job} view="list" /> {/* Add the view prop here */}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
        {isDetailViewVisible && (
          <div className={styles.LeftArea}>
            <Droppable droppableId="selectedList">
              {(provided) => (
                <div>
                {activeJob && (
                  <JobDetail job={activeJob} />
                )}
                <div {...provided.droppableProps} ref={provided.innerRef} className={styles.ListArea}>
                  {selectedJobs.map((job, index) => (
                    <Draggable key={job.id} draggableId={job.id.toString()} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          onClick={() => setActiveJob(job)}
                          style={{
                            ...provided.draggableProps.style,
                            cursor: 'pointer',
                            border: '1px solid #E7E5E4',
                            borderRadius: '15px',
                            margin: '12px',
                            paddingLeft: '24px',
                            paddingTop: '12px',
                            paddingRight: '13.5px',
                            paddingBottom: '9px',
                          }}
                        >
                          <div className={styles.SelectedJobListRow}>
                            <div className={styles.SelectedListTitle}>{job.jobTitle}</div>
                            <div className={styles.SelectedJobCompany}>@{job.companyName}</div>
                          </div>
                          <div className={styles.SelectedJobListRow}>
                            <div className={styles.SelectedJobType}>Full Time</div>
                            <div className={styles.SelectedJobLocation}>{job.location}</div>
                            <div className={styles.SelectedJobSalary}>${job.salaryMin} - ${job.salaryMax}</div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
                </div>
              )}
            </Droppable>
          </div>
        )}
      </div>
    </DragDropContext>
  );
};

export default JobBoard;
