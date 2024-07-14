import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn, initialText } from "@/lib/utils"

interface UserAvatarProps {
  src?: string
  className?: string
  classNameFallback?: string
  initialName: string
}

const UserAvatar = ({ src, className, classNameFallback, initialName }: UserAvatarProps) => {

  return (
    <div className="relative pointer-events-none">
      <Avatar className={cn("h-10 w-10", className)}>
        <AvatarImage className="object-cover" src={src} />
        <AvatarFallback
          className={cn("font-semibold text-xs md:text-base bg-muted", classNameFallback)}
        >
          {initialText(initialName)}
        </AvatarFallback>
      </Avatar>
    </div>
  )
}
export default UserAvatar