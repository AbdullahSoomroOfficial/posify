export default {
  paths: {
    "/products": {
      post: {
        summary: "Create a new product",
        tags: ["Products"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Product",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Product created successfully",
          },
          "400": {
            description: "Bad request",
          },
        },
      },
      get: {
        summary: "Get all products",
        tags: ["Products"],
        responses: {
          "200": {
            description: "List of products",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Product",
                  },
                },
              },
            },
          },
        },
      },
    },
    "/products/{id}": {
      get: {
        summary: "Get a product by ID",
        tags: ["Products"],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "string",
            },
            description: "Product ID",
          },
        ],
        responses: {
          "200": {
            description: "Product details",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Product",
                },
              },
            },
          },
          "404": {
            description: "Product not found",
          },
        },
      },
      put: {
        summary: "Update a product by ID",
        tags: ["Products"],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "string",
            },
            description: "Product ID",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Product",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Product updated successfully",
          },
          "400": {
            description: "Bad request",
          },
          "404": {
            description: "Product not found",
          },
        },
      },
      delete: {
        summary: "Delete a product by ID",
        tags: ["Products"],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "string",
            },
            description: "Product ID",
          },
        ],
        responses: {
          "200": {
            description: "Product deleted successfully",
          },
          "404": {
            description: "Product not found",
          },
        },
      },
    },
  },
};
