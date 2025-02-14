import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Vendor from '@/models/Vendor';
import VendorForm from '@/components/VendorForm';
import { Types } from 'mongoose';

export default async function EditVendorPage({ params }) {
  const session = await auth();
  if (!session) {
    redirect('/');
  }

  const { id } = await params;

  await dbConnect();

  const user = await User.findOne({ email: session.user.email });
  if (!user) {
    redirect('/');
  }

  const vendor = await Vendor.findOne({
    _id: Types.ObjectId.createFromHexString(id),
    userId: user._id,
  });

  if (!vendor) {
    redirect('/');
  }

  // Serialize the vendor data
  const serializedVendor = JSON.parse(JSON.stringify(vendor));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-8">Edit Vendor</h1>
      <VendorForm vendor={serializedVendor} />
    </div>
  );
}