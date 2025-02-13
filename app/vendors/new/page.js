import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import VendorForm from '@/components/VendorForm';

export default async function NewVendorPage() {
  const session = await auth();
  if (!session) {
    redirect('/');
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-8">Add New Vendor</h1>
      <VendorForm />
    </div>
  );
} 