import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Product } from "@interfaces";
import { api } from "@/api";
import { useToast } from "@/hooks/use-toast";
import { EditProduct } from "@/components/edit-product";
import { DeleteProduct } from "@/components/delete-product";

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
    return <div>No product found.</div>;
  }

  return (
    <div>
      <h1>Product Details</h1>
      <p>
        <strong>ID:</strong> {product._id}
      </p>
      <p>
        <strong>Name:</strong> {product.name}
      </p>
      <p>
        <strong>Price:</strong> ${product.price}
      </p>
      <div className="flex items-center gap-2">
        <EditProduct
          productId={product._id}
          name={product.name}
          price={product.price}
          fetchProduct={fetchProduct}
        />
        <DeleteProduct productId={product._id} />
      </div>
    </div>
  );
}
