import { useState, useEffect, useMemo } from "react";
import "../index.css";
import loadingAnimation from "../images/loading.json";
import Lottie from "lottie-react";
import Searchbar from "./Searchbar";

export interface Job {
  logoImgUrl: string;
  clubName: string;
  jobTitle: string;
  location: string;
  jobLink: string;
}

const Home = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const fetching = async () => {
    try {
      const response = await fetch("http://localhost:3001/jobs");

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      console.log(data);
      setJobs(data);
    } catch (error) {
      throw new Error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetching();
  }, []);

  useEffect(() => {
    setFilteredJobs(jobs);
  }, [jobs]);

  const processedJobs = useMemo(() => {
    return filteredJobs.sort((a, b) => a.location.localeCompare(b.location));
  }, [filteredJobs]);

  if (loading) {
    return (
      <div className="flex column justify-center items-center h-screen">
        <Lottie
          animationData={loadingAnimation}
          loop={true}
          autoPlay={true}
          height={400}
          width={400}
        />
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="flex-1 justify-content text-center font-sans font-semibold text-2xl">
          U.S. Soccer Analytics Jobs
        </h1>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-500">
          Button
        </button>
      </header>
      <Searchbar jobs={jobs} setFilteredJobs={setFilteredJobs} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {processedJobs.map((job: Job) => {
          return (
            <div
              key={job.jobLink}
              className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
            >
              <div className="flex justify-center items-center h-30">
                <img className="w-20 h-20" src={job.logoImgUrl} alt="logo" />
              </div>
              <h2 className="text-lg font-semibold mt-2">{job.clubName}</h2>
              <p className="text-black-800">{job.jobTitle}</p>
              <p className="text-gray-600">{job.location}</p>
              <br />
              <a
                href={job.jobLink}
                className="text-blue-500 hover:text-blue-600"
              >
                Job Link Here
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
