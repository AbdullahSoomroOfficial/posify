import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Product } from "@interfaces";
import { api } from "@/api";
import { useToast } from "@/hooks/use-toast";
import { EditProduct } from "@/components/edit-product";
import { DeleteProduct } from "@/components/delete-product";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BackButton } from "@/components/back-button";

export function ProductById() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const { toast } = useToast();

  async function fetchProduct() {
    const { success, data, errorMessage } = await api.product.getProductById(
      productId!
    );
    if (!success) {
      toast({
        variant: "destructive",
        title: errorMessage as string,
      });
    }
    setProduct(data as Product);
  }

  useEffect(() => {
    if (!productId) return; // if no productId then return early
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-500">No product found.</p>
      </div>
    );
  }

  return (
    <>
      <BackButton />
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Product Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>
              <strong>ID:</strong> {product._id}
            </p>
            <p>
              <strong>Name:</strong> {product.name}
            </p>
            <p>
              <strong>Price:</strong> ${product.price}
            </p>
            <div className="flex gap-4 mt-4">
              <EditProduct
                productId={product._id}
                name={product.name}
                price={product.price}
                fetchProduct={fetchProduct}
              />
              <DeleteProduct productId={product._id} />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
