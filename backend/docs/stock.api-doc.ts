export default {
  paths: {
    "/stocks": {
      post: {
        summary: "Create a new stock",
        tags: ["Stocks"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Stock",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Stock created successfully",
          },
          "400": {
            description: "Bad request",
          },
        },
      },
      get: {
        summary: "Get all stocks",
        tags: ["Stocks"],
        responses: {
          "200": {
            description: "List of stocks",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Stock",
                  },
                },
              },
            },
          },
        },
      },
    },
    "/stocks/{id}": {
      get: {
        summary: "Get a stock by ID",
        tags: ["Stocks"],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "string",
            },
            description: "Stock ID",
          },
        ],
        responses: {
          "200": {
            description: "Stock details",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Stock",
                },
              },
            },
          },
          "404": {
            description: "Stock not found",
          },
        },
      },
      put: {
        summary: "Update a stock by ID",
        tags: ["Stocks"],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "string",
            },
            description: "Stock ID",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Stock",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Stock updated successfully",
          },
          "400": {
            description: "Bad request",
          },
          "404": {
            description: "Stock not found",
          },
        },
      },
      delete: {
        summary: "Delete a stock by ID",
        tags: ["Stocks"],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "string",
            },
            description: "Stock ID",
          },
        ],
        responses: {
          "200": {
            description: "Stock deleted successfully",
          },
          "404": {
            description: "Stock not found",
          },
        },
      },
    },
  },
};
