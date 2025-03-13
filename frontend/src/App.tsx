import { BrowserRouter, Routes, Route } from "react-router";
import {
  Products,
  ProductById,
  Stocks,
  Orders,
  OrderById,
  Dashboard,
} from "@pages";
import { Layout } from "@/components/layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:productId" element={<ProductById />} />
          <Route path="stocks" element={<Stocks />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:orderId" element={<OrderById />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
