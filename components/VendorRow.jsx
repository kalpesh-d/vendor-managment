import { TableCell, TableRow } from "@/components/ui/table";
import { Edit2, Trash2 } from "lucide-react";
import LoadingSpinner from "./LoadingSpinner";
import Link from "next/link";
import { Button } from "./ui/button";

const VendorRow = ({ vendor, onDelete, isDeleting }) => (
  <TableRow key={vendor._id}>
    <TableCell className="font-medium">{vendor.name}</TableCell>
    <TableCell>{vendor.bankAccountNo}</TableCell>
    <TableCell>{vendor.bankName}</TableCell>
    <TableCell className="text-right space-x-2">
      <Link href={`/vendors/${vendor._id}/edit`}>
        <Button variant="outline" size="icon" className="h-8 w-8">
          <Edit2 className="h-4 w-4" />
        </Button>
      </Link>
      <Button
        variant="destructive"
        size="icon"
        className="h-8 w-8"
        onClick={() => onDelete(vendor._id)}
        disabled={isDeleting === vendor._id}
      >
        {isDeleting === vendor._id ? (
          <LoadingSpinner size={4} />
        ) : (
          <Trash2 className="h-4 w-4" />
        )}
      </Button>
    </TableCell>
  </TableRow>
);

export default VendorRow;