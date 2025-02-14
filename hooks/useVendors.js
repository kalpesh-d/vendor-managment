import { useState } from "react";

export default function useVendors(initialVendors) {
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
