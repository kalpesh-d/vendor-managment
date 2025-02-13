import SignIn from "@/components/SignIn";

export default function Home() {
  return (
    <main className="container mx-auto">
      <section className="flex flex-col justify-center items-center h-screen">
        <h1 className="mb-1 text-3xl font-semibold tracking-tighter">Vendor Managment</h1>
        <p className="mb-8 text-gray-500">Sign in to access your account</p>
        <div className="mb-20">
          <SignIn />
        </div>
      </section>
    </main >
  );
}