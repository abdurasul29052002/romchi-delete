import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form.tsx";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input.tsx";
import { z } from "zod";
import { userSchema } from "@/lib/validation.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button.tsx";
import { useEffect, useState } from "react";
import { check, deleteUserAccount, login } from "@/api/userApi.ts";


function App() {

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      phoneNumber: "+998",
      smsCode: ""
    }
  })
  const [sent, setSent] = useState(false)
  const [token, setToken] = useState(false);

  useEffect(() => {
    if (window !== undefined) {
      const token = localStorage.getItem("token")
      if (token) {
        setToken(true)
      } else {
        setToken(false)
      }
    }
  }, []);

  function onSubmit(values: z.infer<typeof userSchema>) {
    if (sent) {
      login(values.phoneNumber, values.smsCode)
        .then(response => {
          localStorage.setItem("token", response.token)
          setToken(true)
        })
      form.reset()
      setSent(false)
    } else {
      check(values.phoneNumber)
        .then(() => {
          setSent(true)
        })
    }
  }

  function logout() {
    localStorage.removeItem("token")
    setToken(false)
  }

  function deleteAccount() {
    if (confirm("Rostdan ham akkauntni o`chirmoqchimisiz")) {
      deleteUserAccount()
        .then(response => {
          alert(response.massage)
        })
        .catch(() => {
          alert("Nomalum xatolik birozdan so`ng urunib ko`ring")
        })
    }
  }

  return (
    <>
      {!token ? (
        <>
          <div className="flex w-full justify-center pt-[200px]">
            <h1 className="text-5xl text-blue-700">Romchi account</h1>
          </div>
          <div className="flex flex-col w-full h-[150px] items-center justify-center">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-2 w-96">
                <FormField
                  control={form.control}
                  name={"phoneNumber"}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="text" placeholder="Phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {
                  sent && (
                    <FormField
                      control={form.control}
                      name={"smsCode"}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input type="text" placeholder="Sms code" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )
                }
                <Button
                  className={"bg-blue-600 hover:bg-blue-900"}
                  type={"submit"}
                >Send</Button>
              </form>
            </Form>
          </div>
        </>
      ) : (

        <div className={"flex flex-col w-full h-[500px] items-center justify-center"}>
          <div className={"w-[200px] flex flex-col items-center gap-y-2"}>
            <h1 className={"text-5xl text-blue-700 pb-5"}>Actions</h1>
            <Button className={"bg-red-500 w-full"} variant="link" onClick={deleteAccount}>Delete account</Button>
            <Button className={"bg-red-400 w-full"} variant="link" onClick={logout}>Log out</Button>
          </div>

        </div>
      )}
    </>
  )
}

export default App
