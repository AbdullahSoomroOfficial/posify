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
import { CreateProductDto, Product } from "@interfaces";
import { api } from "@/api";
import { useToast } from "@/hooks/use-toast";

export function AddProduct({
  onProductCreated,
}: {
  onProductCreated: (product: Product) => void;
}) {
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newProduct = Object.fromEntries(
      formData.entries()
    ) as unknown as CreateProductDto;
    const { success, data, successMessage, errorMessage } =
      await api.product.createProduct(newProduct);
    if (!success) {
      return toast({
        variant: "destructive",
        title: errorMessage as string,
      });
    }
    toast({
      title: successMessage as string,
    });
    onProductCreated(data as Product);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add New Product</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 pt-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" name="name" className="col-span-3" required />
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
