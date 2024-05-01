"use client";

import JobCard from "@/components/job-card";
import JobSkeletonCard from "@/components/job-skeleton-card";
import { Input } from "@/components/ui/input";
import { minBaseSalaryOptions } from "@/constants/base-salary-options";
import { minExpOptions } from "@/constants/experience-options";
import { locationOptions } from "@/constants/location-options";
import { modeOptions } from "@/constants/mode-options";
import { roleOptions } from "@/constants/role-options";
import { techStackOptions } from "@/constants/tech-options";
import useDebounce from "@/hooks/useDebounce";
import {
  selectFilteredJobs,
  selectJobs,
  selectLocations,
  selectModes,
  selectRoles,
  setJobs,
  setSelectedLocations,
  setSelectedModes,
  setSelectedRoles,
} from "@/redux/slices/job-slice";
import { reactSelectStyle } from "@/styles/react-select-style";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

const Home = () => {
  const dispatch = useDispatch();

  const jobs = useSelector(selectJobs);
  const filteredJobs = useSelector(selectFilteredJobs);
  const selectedRoles = useSelector(selectRoles);
  const selectedLocations = useSelector(selectLocations);
  const selectedModes = useSelector(selectModes);

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchCompany = useDebounce(searchTerm, 300);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const getCardData = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
    };

    const res = await fetch(
      `https://api.weekday.technology/adhoc/getSampleJdJSON?limit=10&offset=${page}`,
      requestOptions
    );
    const data = await res.json();
    dispatch(setJobs([...jobs, ...data.jdList]));
    setLoading(false);
  };

  useEffect(() => {
    getCardData();
  }, [page]);

  const handelInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setLoading(true);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, []);

  const handleRoleChange = (selectedOptions) => {
    dispatch(setSelectedRoles(selectedOptions));
  };

  const handleLocationChange = (selectedOptions) => {
    dispatch(setSelectedLocations(selectedOptions));
  };

  const handleModeChange = (selectedOptions) => {
    dispatch(setSelectedModes(selectedOptions));
  };

  return (
    <div className="p-5 flex flex-col space-y-8 max-w-5xl mx-auto pb-[4rem]">
      <p className="text-center font-bold text-secondary text-20">
        Search Jobs
      </p>
      {/* filters */}
      <div className="flex flex-wrap items-center gap-2">
        <Select
          styles={reactSelectStyle}
          isMulti
          placeholder="Roles"
          value={selectedRoles}
          onChange={handleRoleChange}
          options={roleOptions}
        />
        {/* don't find min exp value (always null) on response to filter out */}

        <Select
          styles={reactSelectStyle}
          isMulti
          placeholder="Min Experience"
          options={minExpOptions}
        />
        <Select
          styles={reactSelectStyle}
          isMulti
          placeholder="Location"
          value={selectedLocations}
          onChange={handleLocationChange}
          options={locationOptions}
        />
        <Select
          styles={reactSelectStyle}
          isMulti
          placeholder="Remote"
          value={selectedModes}
          onChange={handleModeChange}
          options={modeOptions}
        />

        {/* don't find min base pay value (always null) on response to filter out */}

        <Select
          styles={reactSelectStyle}
          isMulti
          placeholder="Minimum Base Pay Salary"
          options={minBaseSalaryOptions}
        />

        {/* don't find tech stack on response to filter out */}
        <Select
          styles={reactSelectStyle}
          isMulti
          placeholder="Tech Stack"
          options={techStackOptions}
        />

        {/* don't find company name on response to filter out */}
        <Input
          placeholder="Search Company Name"
          className="text-12 placeholder:text-xs placeholder:text-gray w-fit border-[1.5px]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* job cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredJobs.map((jd, idx) => (
          <JobCard jd={jd} key={idx} />
        ))}
        {loading && (
          <>
            <JobSkeletonCard />
            <JobSkeletonCard />
            <JobSkeletonCard />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
