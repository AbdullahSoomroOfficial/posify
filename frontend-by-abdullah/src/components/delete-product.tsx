import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { api } from "@/api";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router";
import { useState } from "react";

export function DeleteProduct({ productId }: { productId: string }) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    const { success, errorMessage } = await api.product.deleteProductById(
      productId
    );
    if (!success) {
      return toast({
        title: errorMessage as string,
        variant: "destructive",
      });
    }
    toast({
      title: "Product deleted successfully",
    });
    navigate("/products");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are sure you want to delete?</DialogTitle>
        </DialogHeader>
        <div className="pt-4 flex gap-4">
          <Button onClick={() => setOpen(false)} className="flex-1">
            No
          </Button>
          <Button onClick={handleDelete} className="flex-1">
            Yes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
