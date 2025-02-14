'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save } from "lucide-react";

export default function VendorForm({ vendor }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const url = vendor ? `/api/vendors/${vendor._id}` : '/api/vendors';
      const method = vendor ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to save vendor');
      }

      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to save vendor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Vendor Name *</Label>
            <Input
              id="name"
              type="text"
              name="name"
              required
              defaultValue={vendor?.name}
              placeholder="Enter vendor name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bankAccountNo">Bank Account No. *</Label>
            <Input
              id="bankAccountNo"
              type="text"
              name="bankAccountNo"
              required
              defaultValue={vendor?.bankAccountNo}
              placeholder="Enter bank account number"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bankName">Bank Name *</Label>
            <Input
              id="bankName"
              type="text"
              name="bankName"
              required
              defaultValue={vendor?.bankName}
              placeholder="Enter bank name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="addressLine1">Address Line 1 *</Label>
            <Input
              id="addressLine1"
              type="text"
              name="addressLine1"
              required
              defaultValue={vendor?.addressLine1}
              placeholder="Enter address line 1"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="addressLine2">Address Line 2</Label>
            <Input
              id="addressLine2"
              type="text"
              name="addressLine2"
              defaultValue={vendor?.addressLine2}
              placeholder="Enter address line 2"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              type="text"
              name="city"
              defaultValue={vendor?.city}
              placeholder="Enter city"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              type="text"
              name="country"
              defaultValue={vendor?.country}
              placeholder="Enter country"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="zipCode">Zip Code</Label>
            <Input
              id="zipCode"
              type="text"
              name="zipCode"
              defaultValue={vendor?.zipCode}
              placeholder="Enter zip code"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <Button type="submit" disabled={loading} className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            {loading ? 'Saving...' : (vendor ? 'Update Vendor' : 'Create Vendor')}
          </Button>
        </div>
      </form>
    </Card>
  );
} 