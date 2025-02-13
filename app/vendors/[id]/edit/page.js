import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import VendorForm from '@/components/VendorForm';

export default async function EditVendorPage({ params }) {
  const session = await auth();
  if (!session) {
    redirect('/');
  }

  const vendor = await prisma.vendor.findUnique({
    where: {
      id: params.id,
      userId: session.user.id,
    },
  });

  if (!vendor) {
    redirect('/');
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-8">Edit Vendor</h1>
      <VendorForm vendor={vendor} />
    </div>
  );
} 