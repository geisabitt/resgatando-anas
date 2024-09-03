'use client'
import { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import './style.css';
import { Button } from "@/components/ui";

export default function Page() {
  const [allPayments, setAllPayments] = useState<Partial<GetAllPayments>[]>();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 30;

  useEffect(() => {
    const fetchAll = async () => {
        try {
            const response = await fetch(`/api/mp/get-all-payments?offset=${currentPage * itemsPerPage}&limit=${itemsPerPage}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);

            setAllPayments(data.filteredData);
            setTotalItems(data.paging.total);
        } catch (error) {
            console.error("Error fetching payment data:", error);
        }
    };
    fetchAll();
}, [currentPage]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="desktop">
      <Table className="ajuste-tabela">
      <TableHeader>
        <TableRow>
          <TableHead>id</TableHead>
          <TableHead className="max-w-[80px] truncate">Method Id</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="max-w-[100px] truncate">Status Detail</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>

      {allPayments ? (
        <TableBody>
          {allPayments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell>{payment.id}</TableCell>
              <TableCell className="max-w-[80px] truncate">{payment.payment_method_id}</TableCell>
              <TableCell>{payment.status}</TableCell>
              <TableCell className="max-w-[100px] truncate">{payment.status_detail}</TableCell>
              <TableCell>{payment.transaction_amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      ) : (
        <TableCaption>Não foi possível carregar a lista.</TableCaption>
      )}
      </Table>

      <div className="pagination-controls">
        <Button
          disabled={currentPage === 0}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </Button>
        <span>Page {currentPage + 1} of {totalPages}</span>
        <Button
          disabled={currentPage + 1 >= totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
