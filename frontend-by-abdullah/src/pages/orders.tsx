import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Order } from "@interfaces";
import { api } from "@/api";
import { AddOrder } from "@/components/add-order";
import { NavLink } from "react-router";

export function Orders() {
  // const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const { toast } = useToast();

  const getOrders = async () => {
    const { success, data, errorMessage } = await api.order.getOrders();
    if (!success) {
      return toast({
        title: errorMessage as string,
      });
    }
    setOrders(data as Order[]);
  };

  useEffect(() => {
    getOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Orders</h2>
        <AddOrder getOrders={getOrders} />
      </div>
      {/* <div>
        <Input
          placeholder="Search orders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div> */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Items</TableHead>
            <TableHead>Subtotal</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell>{order.items.length}</TableCell>
              <TableCell>${order.subTotal}</TableCell>
              <TableCell>${order.discount}</TableCell>
              <TableCell>${order.totalAmount}</TableCell>
              <TableCell>
                <NavLink to={order._id}>
                  <Button variant="outline">View</Button>
                </NavLink>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
