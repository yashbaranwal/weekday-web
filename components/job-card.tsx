import Image from "next/image";
import { Badge } from "./ui/badge";
import { TEST_PROFILE_IMAGE_URL } from "@/general";
import { Button } from "./ui/button";
import { Clock } from "lucide-react";

const JobCard = ({ jd }) => {
  return (
    <div className="relative overflow-hidden border rounded-3xl shadow-md hover:scale-105 transition-all duration-300">
      <div className="p-4 flex flex-col gap-2">
        <Badge
          className="bg-white text-darkGray text-[10px] font-light border rounded-full
       border-lightGray px-2 w-fit hover:bg-transparent"
        >
          <Clock size={10} className="mr-1" />
          Posted 12 days ago
        </Badge>
        <div className="flex items-center space-x-3">
          <Image
            src={TEST_PROFILE_IMAGE_URL}
            width={50}
            height={50}
            alt={"company-name"}
            className="rounded-lg"
          />
          <div>
            <p className="capitalize font-thin">{jd.jobRole}</p>
            <p className="text-[10px] capitalize font-bold">{jd.location}</p>
          </div>
        </div>
        {jd.minJdSalary && jd.maxJdSalary && (
          <p className="text-gray text-14">
            Estimated Salary: {jd.salaryCurrencyCode}
            {jd.minJdSalary} - {jd.maxJdSalary} LPA
          </p>
        )}
        <div>
          <p>About Company:</p>
          <p className="font-bold text-14">About us</p>
          <p className="font-light text-gray text-12 pt-2">
            {jd.jobDetailsFromCompany}
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 bg-gradient-to-b from-[rgba(245,245,245,0.6)] to-[rgba(255,255,255,1)] w-full pb-4">
        <p className="text-blue cursor-pointer text-center text-12 pt-4">
          View job
        </p>
        <div className="px-4 flex flex-col gap-2">
          <div>
            <p className="text-gray font-bold text-14 mt-4">
              Minimum Experience
            </p>
            <p className="font-light text-12">{jd.minExp ?? 3} Years</p>
          </div>
          <Button className="w-full bg-primary text-black">Easy Apply</Button>
          <Button className="w-full bg-secondary hover:bg-secondary">
            <div className="flex items-center space-x-2 mr-3">
              <Image
                src={TEST_PROFILE_IMAGE_URL}
                width={20}
                height={20}
                alt={"company-name"}
                className="rounded-lg blur-[1px]"
              />
              <Image
                src={TEST_PROFILE_IMAGE_URL}
                width={20}
                height={20}
                alt={"company-name"}
                className="rounded-lg blur-[1px]"
              />
            </div>
            Unlock referral asks
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
