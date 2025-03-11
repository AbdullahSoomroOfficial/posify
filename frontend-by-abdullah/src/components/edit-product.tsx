import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { UpdateProductDto } from "@interfaces";
import { api } from "@/api";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export function EditProduct({
  productId,
  name,
  price,
  fetchProduct,
}: {
  productId: string;
  name: string;
  price: number;
  fetchProduct: () => void;
}) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const updateProduct = Object.fromEntries(
      formData.entries()
    ) as unknown as UpdateProductDto;
    const { success, successMessage, errorMessage } =
      await api.product.updateProductById(productId, updateProduct);
    if (!success) {
      return toast({
        variant: "destructive",
        title: errorMessage as string,
      });
    }
    toast({
      title: successMessage as string,
    });
    fetchProduct();
    setOpen(false); // Close the dialog after successful update
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 pt-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                className="col-span-3"
                defaultValue={name}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                className="col-span-3"
                defaultValue={price}
                required
              />
            </div>
            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
