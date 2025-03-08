import {
  Dialog,
  DialogContent,
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
        <DialogTitle>Are sure you want to delete?</DialogTitle>
        <div>
          <Button onClick={() => setOpen(false)} className="mr-2">
            No
          </Button>
          <Button onClick={handleDelete}>Yes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
