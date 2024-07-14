import { Skeleton } from "./ui/skeleton"

const SkeletonCard = () => {
  return (
    <div className="border rounded-lg p-2 flex flex-col space-y-4 shadow-sm">
      <div className="space-y-1">
        <Skeleton className="w-56 h-4" />
        <Skeleton className="w-24 h-3.5" />
      </div>
      <div className="flex justify-end">
        <Skeleton className="w-20 h-5" />
      </div>
    </div>
  )
}
export default SkeletonCard