import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/api";
import { CreateOrderDto, Product } from "@interfaces";

export function AddOrder({ getOrders }: { getOrders: () => void }) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  // Hold available products for search suggestions.
  const [availableProducts, setAvailableProducts] = useState<Product[]>([]);
  // Local state for the search input.
  const [searchQuery, setSearchQuery] = useState("");

  // Array state for order items.
  const [items, setItems] = useState<
    Array<{
      productId: string;
      productName: string;
      price: number;
      quantity: number;
    }>
  >([]);
  const [discount, setDiscount] = useState<number>(0);

  // Fetch available products for suggestions on mount.
  useEffect(() => {
    async function fetchProducts() {
      const { success, data, errorMessage } = await api.product.getProducts();
      if (!success) {
        return toast({
          variant: "destructive",
          title: errorMessage as string,
        });
      }
      setAvailableProducts(data as Product[]);
    }
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When user types in the search input.
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // On selection, find product by name and add it as a new order item.
  const handleProductSelect = () => {
    const matched = availableProducts.find(
      (p) => p.name.toLowerCase() === searchQuery.toLowerCase()
    );
    if (matched) {
      setItems([
        ...items,
        {
          productId: matched._id,
          productName: matched.name,
          price: matched.price,
          quantity: 1,
        },
      ]);
      setSearchQuery(""); // Clear the search box on successful selection.
    } else {
      toast({
        variant: "destructive",
        title: `Product "${searchQuery}" not found.`,
      });
    }
  };

  // Allow removal of an added order item.
  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  // Compute the subtotal (line total of each item)
  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const totalAmount = subtotal - discount;

  // Create order and submit.
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (items.length === 0) {
      return toast({
        variant: "destructive",
        title: "Please add at least one order item.",
      });
    }

    // Build the order data based on the Order interface.
    const orderData: CreateOrderDto = {
      items: items.map((item) => ({
        productId: item.productId,
        price: item.price,
        quantity: item.quantity,
        lineTotal: item.price * item.quantity,
      })),
      discount,
    };

    const { success, successMessage, errorMessage } =
      await api.order.createOrder(orderData);
    if (!success) {
      return toast({
        variant: "destructive",
        title: errorMessage as string,
      });
    }
    getOrders();
    toast({ title: successMessage as string });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Order</Button>
      </DialogTrigger>
      <DialogContent className="min-w-5xl">
        <DialogHeader>
          <DialogTitle>Add Order</DialogTitle>
        </DialogHeader>
        {/* Single product search at the top */}
        <div className="mb-4">
          <Label htmlFor="productSearch">Search Product</Label>
          <div className="flex gap-2">
            <Input
              id="productSearch"
              value={searchQuery}
              onChange={handleSearchChange}
              list="products-list"
              placeholder="Enter product name"
              required
            />
            <Button type="button" onClick={handleProductSelect}>
              Add Product
            </Button>
          </div>
          <datalist id="products-list">
            {availableProducts.map((p) => (
              <option key={p._id} value={p.name} />
            ))}
          </datalist>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Order items list */}
          <div className="space-y-4 py-4">
            {items.map((item, index) => (
              <div key={index} className="grid grid-cols-6 gap-4 items-center">
                <div className="col-span-2">
                  <Label>{item.productName}</Label>
                </div>
                <div className="col-span-1">
                  <Label>Price</Label>
                  <p>${item.price.toFixed(2)}</p>
                </div>
                <div className="col-span-1">
                  <Label>Quantity</Label>
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => {
                      const newItems = [...items];
                      newItems[index].quantity = Number(e.target.value);
                      setItems(newItems);
                    }}
                    required
                  />
                </div>
                <div className="col-span-1">
                  <Label>Line Total</Label>
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <div className="col-span-1 flex justify-end">
                  <Button
                    variant="destructive"
                    type="button"
                    onClick={() => removeItem(index)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Discount input */}
          <div className="mt-4 grid grid-cols-4 items-center gap-4">
            <Label htmlFor="discount" className="text-right">
              Discount
            </Label>
            <div className="col-span-3">
              <Input
                id="discount"
                type="number"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="mt-4">
            <p>
              <strong>Subtotal:</strong> ${subtotal.toFixed(2)}
            </p>
            <p>
              <strong>Total Amount:</strong> ${totalAmount.toFixed(2)}
            </p>
          </div>

          <DialogFooter>
            <Button type="submit">Save Order</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
