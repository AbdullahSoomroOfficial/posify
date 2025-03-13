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
      url: `http://localhost:${process.env.PORT}/api`,
      description: "Development server",
    },
  ],
  components: {
    schemas: {
      ...productApiDoc.schemas,
      ...stockApiDoc.schemas,
      ...orderApiDoc.schemas,
    },
  },
  paths: {
    ...productApiDoc.paths,
    ...stockApiDoc.paths,
    ...orderApiDoc.paths,
  },
};

export { swaggerSpec };
