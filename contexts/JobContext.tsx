import React, { createContext, useContext, useState } from "react";

type Job = {
  id: number;
  name: string;
  description: string;
  keywordList: string[];
};

type JobContextType = {
  jobs: Job[];
  addJob: (job: Job) => void;
  removeJob: (id: number) => void;
  getJobListSize: () => number;
};

const JobContext = createContext<JobContextType | undefined>(undefined);

export function JobProvider({ children }: { children: React.ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>([]);

  const addJob = (job: Job) => {
    setJobs((prevJobs) => [...prevJobs, job]);
  };

  const removeJob = (id: number) => {
    setJobs((prevJobs) => prevJobs.filter((j) => j.id !== id));
  };

  const getJobListSize = () => {
    return jobs.length;
  }

  return (
    <JobContext.Provider value={{ jobs, addJob, removeJob, getJobListSize}}>
      {children}
    </JobContext.Provider>
  );
}

export function useJobs() {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error("useJobs must be used within a JobProvider");
  }
  return context;
}