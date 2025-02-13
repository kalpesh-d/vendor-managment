'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Edit2, Trash2 } from "lucide-react";

export default function VendorList({ initialVendors, totalPages }) {
  const [vendors, setVendors] = useState(initialVendors);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);

  const loadPage = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/vendors?page=${page}`);
      const data = await response.json();
      setVendors(data.vendors);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error loading vendors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this vendor?')) {
      return;
    }

    setDeleteLoading(id);
    try {
      const response = await fetch(`/api/vendors/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete vendor');
      }

      // Refresh the current page
      loadPage(currentPage);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to delete vendor');
    } finally {
      setDeleteLoading(null);
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="relative">
        {loading && (
          <div className="absolute inset-0 bg-background/50 flex items-center justify-center backdrop-blur-sm">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vendor Name</TableHead>
              <TableHead>Bank Account No.</TableHead>
              <TableHead>Bank Name</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vendors.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  No vendors found
                </TableCell>
              </TableRow>
            ) : (
              vendors.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell className="font-medium">{vendor.name}</TableCell>
                  <TableCell>{vendor.bankAccountNo}</TableCell>
                  <TableCell>{vendor.bankName}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Link href={`/vendors/${vendor.id}/edit`}>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleDelete(vendor.id)}
                      disabled={deleteLoading === vendor.id}
                    >
                      {deleteLoading === vendor.id ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-background"></div>
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 p-4 border-t">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => loadPage(page)}
              disabled={loading}
            >
              {page}
            </Button>
          ))}
        </div>
      )}
    </Card>
  );
} 