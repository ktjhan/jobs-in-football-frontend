import { useState } from "react";
import { Job } from "./Home";

interface SearchProps {
  jobs: Job[];
  setFilteredJobs: React.Dispatch<React.SetStateAction<Job[]>>;
}

const Searchbar: React.FC<SearchProps> = ({ jobs, setFilteredJobs }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filteredJobs = jobs.filter((job) =>
      job.location.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredJobs(filteredJobs);
  };

  return (
    <div>
      <input
        type="text"
        className="p-2 border border-gray-300 rounded"
        placeholder="Search by U.S. cities"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
};

export default Searchbar;
