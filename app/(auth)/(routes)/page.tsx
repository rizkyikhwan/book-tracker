"use client"

import FormInput from "@/components/form/form-input"
import GridBackground from "@/components/grid-background"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, SquareLibrary } from "lucide-react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const formSchema = z.object({
  username: z.string().min(1, "This field has to be filled."),
  password: z.string().min(1, "This field has to be filled.")
})

const AuthPage = () => {
  const router = useRouter()
  const [isDisabled, setIsDisabled] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: ""
    },
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await signIn("credentials", {
        redirect: false,
        callbackUrl: `${window.location.origin}/home`,
        ...values
      })

      if (res?.error) {
        toast.error(res.error)
      }

      if (res?.ok) {
        setIsDisabled(true)
        router.push("/home")
        router.refresh()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <GridBackground>
      <div className="min-h-screen w-full flex flex-col items-center justify-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center space-y-6 p-4 rounded-xl bg-transparent shadow-lg border backdrop-filter backdrop-blur-[2.5px] max-w-96 w-full">
            <div className="flex items-center justify-center">
              <SquareLibrary className="text-main-primary" />
            </div>
            <div className="mr-auto">
              <h1 className="font-sans font-bold text-base">Welcome to Book Tracker</h1>
              <p className="text-xs text-slate-500">Login to book tracker for update your list reading book</p>
            </div>
            <div className="space-y-4 flex flex-col w-full">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormInput title="Username" type="text" field={field} disabled={isLoading} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormInput title="Password" type="password" field={field} disabled={isLoading} />
                  </FormItem>
                )}
              />
              <div className="w-full h-px bg-slate-200" />
              <Button type="submit" className="mt-4" variant="main" disabled={isLoading || isDisabled}>
                {isLoading || isDisabled ? <Loader2 className="animate-spin" /> : "Sign In"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </GridBackground>
  )
}
export default AuthPage