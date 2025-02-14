"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import VendorTableHeader from "./VendorTableHeader";
import LoadingSpinner from "./LoadingSpinner";
import { Card } from "@/components/ui/card";
import VendorRow from "./VendorRow";
import Pagination from "./Pagination";
import useVendors from "@/hooks/useVendors";

export default function VendorList({ initialVendors = [], totalPages = 1 }) {
  const {
    vendors,
    currentPage,
    loading,
    deleteLoading,
    error,
    loadPage,
    handleDelete
  } = useVendors(initialVendors);

  return (
    <Card className="overflow-hidden">
      <div className="relative">
        {loading && (
          <div className="absolute inset-0 bg-background/50 flex items-center justify-center backdrop-blur-sm">
            <LoadingSpinner />
          </div>
        )}
        {error && (
          <div className="p-4 text-center text-red-500 bg-red-50 dark:bg-red-950/50">
            {error}
          </div>
        )}
        <Table>
          <VendorTableHeader />
          <TableBody>
            {!vendors.length ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  {loading ? 'Loading...' : 'No vendors found'}
                </TableCell>
              </TableRow>
            ) : (
              vendors.map(vendor => (
                <VendorRow
                  key={vendor._id}
                  vendor={vendor}
                  onDelete={handleDelete}
                  isDeleting={deleteLoading}
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={loadPage}
        isLoading={loading}
      />
    </Card>
  );
}