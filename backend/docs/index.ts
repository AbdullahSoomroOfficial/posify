import orderApiDoc from "./order.api-doc";
import productApiDoc from "./product.api-doc";
import stockApiDoc from "./stock.api-doc";

const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "POSify API Docs",
    version: "1.0.0",
    description: "API documentation for POSify",
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT}`,
      description: "Development server",
    },
  ],
  components: {
    schemas: {
      Product: {
        type: "object",
        required: ["name", "price"],
        properties: {
          _id: {
            type: "string",
            description: "The auto-generated id of the product",
          },
          name: {
            type: "string",
            description: "The name of the product",
          },
          price: {
            type: "number",
            description: "The price of the product",
          },
        },
        example: {
          _id: "d5fE_asz",
          name: "Sample Product",
          price: 100,
        },
      },
      Stock: {
        type: "object",
        required: ["productId", "quantity"],
        properties: {
          _id: {
            type: "string",
            description: "The auto-generated id of the stock",
          },
          productId: {
            type: "string",
            description: "The id of the product",
          },
          quantity: {
            type: "number",
            description: "The quantity of the product in stock",
          },
        },
        example: {
          _id: "d5fE_asz",
          productId: "d5fE_asz",
          quantity: 50,
        },
      },
      Order: {
        type: "object",
        required: ["items", "discount"],
        properties: {
          items: {
            type: "array",
            items: {
              type: "object",
              properties: {
                productId: {
                  type: "string",
                  description: "The id of the product",
                },
                quantity: {
                  type: "number",
                  description: "The quantity of the product",
                },
              },
            },
            example: [
              {
                productId: "d5fE_asz",
                quantity: 2,
              },
            ],
          },
          discount: {
            type: "number",
            example: 10,
          },
        },
      },
    },
  },
  paths: {
    ...productApiDoc.paths,
    ...stockApiDoc.paths,
    ...orderApiDoc.paths,
  },
};

export { swaggerSpec };
