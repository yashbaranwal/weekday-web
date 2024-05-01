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
import { reactSelectStyle } from "@/styles/react-select-style";
import { useEffect, useState } from "react";
import Select from "react-select";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
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
    setJobs((prev) => [...prev, ...data.jdList]);
    setFilteredJobs((prev) => [...prev, ...data.jdList]);
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

  const [selectedRoles, setSelectedRoles] = useState([]);

  // Update selected roles when user selects new roles
  const handleRoleChange = (selectedOptions) => {
    setSelectedRoles(selectedOptions);

    // Filter jobs based on selected roles
    const result = jobs.filter((job) =>
      selectedOptions.every((selectedRole) =>
        job.jobRole.includes(selectedRole.value)
      )
    );
    setFilteredJobs(result);
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
        <Select
          styles={reactSelectStyle}
          isMulti
          placeholder="Min Experience"
          // value={formData.orderDispatchDays}
          // onChange={(selectedValues) => {
          //   setFormData({
          //     ...formData,
          //     orderDispatchDays: selectedValues,
          //   });
          // }}
          options={minExpOptions}
        />
        <Select
          styles={reactSelectStyle}
          isMulti
          placeholder="Location"
          // value={formData.orderDispatchDays}
          // onChange={(selectedValues) => {
          //   setFormData({
          //     ...formData,
          //     orderDispatchDays: selectedValues,
          //   });
          // }}
          options={locationOptions}
        />
        <Select
          styles={reactSelectStyle}
          isMulti
          placeholder="Remote"
          // value={formData.orderDispatchDays}
          // onChange={(selectedValues) => {
          //   setFormData({
          //     ...formData,
          //     orderDispatchDays: selectedValues,
          //   });
          // }}
          options={modeOptions}
        />
        <Select
          styles={reactSelectStyle}
          isMulti
          placeholder="Minimum Base Pay Salary"
          // value={formData.orderDispatchDays}
          // onChange={(selectedValues) => {
          //   setFormData({
          //     ...formData,
          //     orderDispatchDays: selectedValues,
          //   });
          // }}
          options={minBaseSalaryOptions}
        />
        <Select
          styles={reactSelectStyle}
          isMulti
          placeholder="Tech Stack"
          // value={formData.orderDispatchDays}
          // onChange={(selectedValues) => {
          //   setFormData({
          //     ...formData,
          //     orderDispatchDays: selectedValues,
          //   });
          // }}
          options={techStackOptions}
        />
        <Input
          placeholder="Search Company Name"
          className="text-12 placeholder:text-xs placeholder:text-gray w-fit border-[1.5px]"
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
