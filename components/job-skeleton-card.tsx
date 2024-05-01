import { Skeleton } from "@/components/ui/skeleton";

const JobSkeletonCard = () => {
  return (
    <div className="flex flex-col space-y-4">
      <Skeleton className="h-72 w-full rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
};

export default JobSkeletonCard;
