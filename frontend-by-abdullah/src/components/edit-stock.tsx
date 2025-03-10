import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Stock, UpdateStockDto } from "@interfaces";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { api } from "@/api";

export function EditStock({
  open,
  setOpen,
  selectedStock,
  getStocks,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedStock: Stock | null;
  getStocks: () => void;
}) {
  const { toast } = useToast();

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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <DialogHeader>
              <DialogTitle>Edit Stock</DialogTitle>
            </DialogHeader>
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
  );
}
