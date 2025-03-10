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
import { Stock } from "@interfaces";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/api";
import { EditStock } from "@/components/edit-stock";

export function Stocks() {
  // const [searchTerm, setSearchTerm] = useState("");
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  // const filteredStocks =
  //   searchTerm === ""
  //     ? stocks
  //     : stocks.filter((stock) =>
  //         stock.productId.includes(searchTerm.toLowerCase())
  //       );

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

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Stock</h2>
      </div>
      {/* <div>
        <Input
          placeholder="Search stock..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div> */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product Id</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stocks.map((stock) => (
            <TableRow key={stock._id}>
              <TableCell>{stock.productId}</TableCell>
              <TableCell>{stock.quantity}</TableCell>
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
      <EditStock
        open={open}
        setOpen={setOpen}
        selectedStock={selectedStock}
        getStocks={getStocks}
      />
    </div>
  );
}
