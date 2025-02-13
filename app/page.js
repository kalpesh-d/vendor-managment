import { auth } from "@/auth";
import SignIn from "@/components/SignIn";

export default async function Home() {
  const session = await auth()
  const user = session?.user

  return (
    <main className="container mx-auto">
      <section className="flex flex-col justify-center items-center h-screen">
        <h1 className="mb-1 text-3xl font-semibold tracking-tighter">Vendor Managment</h1>
        <p className="mb-8 text-gray-500">Sign in to access your account</p>
        {user ? "welcome" :
          <div className="mb-20">
            <SignIn />
          </div>}
      </section>
    </main >
  );
}