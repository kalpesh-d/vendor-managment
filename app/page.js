import SignIn from "@/components/SignIn";
import { auth } from "@/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import VendorList from "@/components/VendorList";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import Vendor from "@/models/Vendor";
import { Plus } from "lucide-react";

const ITEMS_PER_PAGE = 10;

export default async function Home() {
  const session = await auth();

  let vendors = [];
  let totalPages = 0;

  if (session) {
    await dbConnect();

    let user = await User.findOne({ email: session.user.email });
    if (!user) {
      user = await User.create({
        email: session.user.email,
        name: session.user.name,
      });
    }

    const [vendorData, totalCount] = await Promise.all([
      Vendor.find({ userId: user._id })
        .limit(ITEMS_PER_PAGE)
        .sort({ createdAt: -1 }),
      Vendor.countDocuments({ userId: user._id }),
    ]);

    vendors = JSON.parse(JSON.stringify(vendorData));
    totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <header className="flex justify-between items-center mb-8 pb-6 border-b">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Vendor Management</h1>
            <p className="text-muted-foreground mt-1">
              Manage your vendors and their information
            </p>
          </div>
          <SignIn />
        </header>

        {session ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Vendors</h2>
                <p className="text-sm text-muted-foreground">
                  A list of all your vendors
                </p>
              </div>
              <Link href="/vendors/new">
                <Button className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add New Vendor
                </Button>
              </Link>
            </div>

            <VendorList initialVendors={vendors} totalPages={totalPages} />
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold mb-2">Welcome to Vendor Management</h2>
            <p className="text-muted-foreground mb-6">
              Please sign in to manage your vendors
            </p>
          </div>
        )}
      </div>
    </main>
  );
}