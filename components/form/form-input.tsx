import { FormControl, FormItem, FormLabel, FormMessage, useFormField } from "../ui/form"
import { Input, InputProps } from "../ui/input"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

interface FormInputProps {
  field: any
  title?: string
  className?: string
}

const FormInput = ({ field, title, className, ...props }: FormInputProps & InputProps) => {
  const { error } = useFormField()
  const pathname = usePathname()

  return (
    <FormItem className="flex-1 space-y-1">
      {title && (
        <FormLabel className={cn("text-xs font-bold tracking-wider uppercase text-slate-500", pathname !== "/" && "text-current", error && "text-rose-500")}>
          {title}
        </FormLabel>
      )}
      <FormControl>
        <Input
          className={cn("rounded-sm focus-visible:ring-0 focus-visible:ring-offset-0", className)}
          {...props}
          {...field}
        />
      </FormControl>
      <FormMessage className="ml-auto text-xs text-rose-500" />
    </FormItem>
  )
}
export default FormInput