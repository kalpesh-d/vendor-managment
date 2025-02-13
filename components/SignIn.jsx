import { signIn } from "@/auth"
import { Button } from "./ui/button"
import Image from "next/image"

export default async function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <Button type="submit">
        <Image src="/google.svg" width={20} height={20} alt="Picture of the author" />
        Sign in with Google
      </Button>
    </form>
  )
} 