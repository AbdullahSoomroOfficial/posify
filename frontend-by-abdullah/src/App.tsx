import { BrowserRouter, Routes, Route } from "react-router";
import { Products, ProductById, Stocks, Orders } from "@pages";
import { Layout } from "@/components/layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<h1>Dashboard</h1>} />
          <Route path="products" element={<Products />} />
          <Route path="products/:productId" element={<ProductById />} />
          <Route path="stocks" element={<Stocks />} />
          <Route path="orders" element={<Orders />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
