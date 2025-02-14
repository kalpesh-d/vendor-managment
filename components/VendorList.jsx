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
import { useState } from "react";

const useVendors = (initialVendors) => {
  const [state, setState] = useState({
    vendors: initialVendors,
    currentPage: 1,
    loading: false,
    deleteLoading: null,
    error: null
  });

  const setError = (error) => setState(s => ({ ...s, error }));
  const setLoading = (loading) => setState(s => ({ ...s, loading }));

  const loadPage = async (page) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/vendors?page=${page}`);
      if (!res.ok) throw new Error('Failed to load vendors');
      const data = await res.json();
      setState(s => ({
        ...s,
        vendors: data.vendors || [],
        currentPage: page,
        loading: false
      }));
    } catch (err) {
      console.error(err);
      setState(s => ({
        ...s,
        vendors: [],
        error: 'Failed to load vendors. Please try again.',
        loading: false
      }));
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return;
    setState(s => ({ ...s, deleteLoading: id, error: null }));
    try {
      const res = await fetch(`/api/vendors/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete vendor');
      await loadPage(state.currentPage);
    } catch (err) {
      console.error(err);
      setError('Failed to delete vendor. Please try again.');
    } finally {
      setState(s => ({ ...s, deleteLoading: null }));
    }
  };

  return { ...state, loadPage, handleDelete };
};

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