export default {
  paths: {
    "/orders": {
      post: {
        summary: "Create order",
        tags: ["Orders"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Order",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Order created successfully",
          },
          "400": {
            description: "Bad request",
          },
        },
      },
      get: {
        summary: "Get all orders",
        tags: ["Orders"],
        responses: {
          "200": {
            description: "List of orders",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Order",
                  },
                },
              },
            },
          },
        },
      },
    },
    "/orders/{id}": {
      get: {
        summary: "Get an order by ID",
        tags: ["Orders"],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "string",
            },
            description: "Order ID",
          },
        ],
        responses: {
          "200": {
            description: "Order details",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Order",
                },
              },
            },
          },
          "404": {
            description: "Order not found",
          },
        },
      },
      put: {
        summary: "Update an order by ID",
        tags: ["Orders"],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "string",
            },
            description: "Order ID",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Order",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Order updated successfully",
          },
          "400": {
            description: "Bad request",
          },
          "404": {
            description: "Order not found",
          },
        },
      },
      delete: {
        summary: "Delete an order by ID",
        tags: ["Orders"],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "string",
            },
            description: "Order ID",
          },
        ],
        responses: {
          "200": {
            description: "Order deleted successfully",
          },
          "404": {
            description: "Order not found",
          },
        },
      },
    },
  },
};
