import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Stock, UpdateStockDto } from "@interfaces";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/api";

export function Stocks() {
  const [searchTerm, setSearchTerm] = useState("");
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const filteredStocks =
    searchTerm === ""
      ? stocks
      : stocks.filter((stock) =>
          stock.productId.includes(searchTerm.toLowerCase())
        );

  const getStocks = async () => {
    const { success, data, errorMessage } = await api.stock.getStocks();
    if (!success) {
      return toast({
        title: errorMessage as string,
      });
    }
    setStocks(data as Stock[]);
  };

  useEffect(() => {
    getStocks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditClick = (stock: Stock) => {
    setSelectedStock(stock);
    setOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStock) return;
    const formData = new FormData(e.target as HTMLFormElement);
    const updateStock = Object.fromEntries(
      formData.entries()
    ) as unknown as UpdateStockDto;
    const { success, successMessage, errorMessage } =
      await api.stock.updateStockById(selectedStock._id, updateStock);
    if (!success) {
      return toast({
        variant: "destructive",
        title: errorMessage as string,
      });
    }
    toast({
      title: successMessage as string,
    });
    getStocks(); // Update the stocks list
    setOpen(false); // Close the dialog after successful update
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Stock</h2>
      </div>
      <div>
        <Input
          placeholder="Search stock..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product Id</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredStocks.map((stock) => (
            <TableRow key={stock._id}>
              <TableCell>{stock.productId}</TableCell>
              <TableCell>{stock.quantity}</TableCell>
              <TableCell>
                {stock.quantity <= 10 ? (
                  <span className="text-red-500 font-semibold">Low Stock</span>
                ) : (
                  <span className="text-green-500 font-semibold">In Stock</span>
                )}
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  onClick={() => handleEditClick(stock)}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Edit Stock</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">
                  Quantity
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  name="quantity"
                  className="col-span-3"
                  defaultValue={selectedStock?.quantity}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Edit</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
