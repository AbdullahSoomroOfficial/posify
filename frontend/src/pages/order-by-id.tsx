import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Order } from "@interfaces";
import { api } from "@/api";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BackButton } from "@/components/back-button";

export function OrderById() {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!orderId) return;
    async function fetchOrder() {
      const { success, data, errorMessage } = await api.order.getOrderById(
        orderId!
      );
      if (!success) {
        toast({
          variant: "destructive",
          title: errorMessage as string,
        });
        return;
      }
      setOrder(data as Order);
    }
    fetchOrder();
  }, [orderId, toast]);

  if (!order) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-600">Loading order details...</p>
      </div>
    );
  }

  return (
    <>
      <BackButton />
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Order Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <p className="break-words">
              <strong>Order ID:</strong> {order._id}
            </p>
            <p>
              <strong>Number of Items:</strong> {order.items.length}
            </p>
          </div>

          <div className="mb-6">
            <CardTitle>
              <h2 className="text-2xl font-semibold mb-2">Order Items</h2>
            </CardTitle>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <Card key={index} className="border rounded-md p-4">
                  <p className="break-words">
                    <strong>Product ID:</strong> {item.productId}
                  </p>
                  <p>
                    <strong>Price:</strong> ${item.price.toFixed(2)}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {item.quantity}
                  </p>
                  <p>
                    <strong>Line Total:</strong> ${item.lineTotal.toFixed(2)}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          <hr className="mb-4" />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p>
                <strong>Subtotal:</strong> ${order.subTotal}
              </p>
              <p>
                <strong>Discount:</strong> ${order.discount}
              </p>
              <p>
                <strong>Total Amount:</strong> ${order.totalAmount}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
