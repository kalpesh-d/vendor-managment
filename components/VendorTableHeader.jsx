import { TableHead, TableHeader, TableRow } from "./ui/table";

const VendorTableHeader = () => (
  <TableHeader>
    <TableRow>
      <TableHead>Vendor Name</TableHead>
      <TableHead>Bank Account No.</TableHead>
      <TableHead>Bank Name</TableHead>
      <TableHead className="text-right">Actions</TableHead>
    </TableRow>
  </TableHeader>
);

export default VendorTableHeader;