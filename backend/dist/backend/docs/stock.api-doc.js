"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    schemas: {
        Stock: {
            type: "object",
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
                _id: "603c9c8b9fz96c001fcb735a",
                productId: "603c9c8b9f1b2c001fcb735a",
                quantity: 50,
            },
        },
        UpdateStock: {
            type: "object",
            properties: {
                quantity: {
                    type: "number",
                    description: "The quantity of the product in stock",
                },
            },
            example: {
                quantity: 50,
            },
        },
    },
    paths: {
        "/stocks": {
            // post: {
            //   summary: "Create a new stock",
            //   tags: ["Stocks"],
            //   requestBody: {
            //     required: true,
            //     content: {
            //       "application/json": {
            //         schema: {
            //           $ref: "#/components/schemas/Stock",
            //         },
            //       },
            //     },
            //   },
            //   responses: {
            //     "201": {
            //       description: "Stock created successfully",
            //     },
            //     "400": {
            //       description: "Bad request",
            //     },
            //   },
            // },
            get: {
                summary: "Get all stocks",
                description: "Fetches an array of stocks.",
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
                description: "Retrieves a single stock by its unique ID.",
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
                description: "Updates an existing stock by its unique ID. Only the 'quantity' field is allowed to be updated. And returns updated stock in response",
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
                                $ref: "#/components/schemas/UpdateStock",
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
            // delete: {
            //   summary: "Delete a stock by ID",
            //   tags: ["Stocks"],
            //   parameters: [
            //     {
            //       in: "path",
            //       name: "id",
            //       required: true,
            //       schema: {
            //         type: "string",
            //       },
            //       description: "Stock ID",
            //     },
            //   ],
            //   responses: {
            //     "200": {
            //       description: "Stock deleted successfully",
            //     },
            //     "404": {
            //       description: "Stock not found",
            //     },
            //   },
            // },
        },
    },
};
