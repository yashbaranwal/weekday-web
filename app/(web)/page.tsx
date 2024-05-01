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
import { useGetJobsMutation } from "@/redux/api";
import { reactSelectStyle } from "@/styles/react-select-style";
import { useEffect } from "react";
import Select from "react-select";

const Home = () => {
  const [getJobs, { data, isLoading }] = useGetJobsMutation();

  console.log(data, "data");

  useEffect(() => {
    getJobs({ limit: 10, offset: 0 });
  }, []);

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
          // value={formData.orderDispatchDays}
          // onChange={(selectedValues) => {
          //   setFormData({
          //     ...formData,
          //     orderDispatchDays: selectedValues,
          //   });
          // }}
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
        {isLoading ? (
          <>
            <JobSkeletonCard />
            <JobSkeletonCard />
            <JobSkeletonCard />
            <JobSkeletonCard />
            <JobSkeletonCard />
            <JobSkeletonCard />
          </>
        ) : (
          data?.jdList?.length > 0 &&
          data.jdList.map((jd) => <JobCard jd={jd} key={jd.jdUid} />)
        )}
      </div>
    </div>
  );
};

export default Home;
