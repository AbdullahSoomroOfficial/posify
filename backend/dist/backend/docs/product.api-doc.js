"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    schemas: {
        Product: {
            type: "object",
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
                _id: "603c9c8b9f1b2c001fcb735a",
                name: "Sample Product",
                price: 100,
            },
        },
        CreateProduct: {
            type: "object",
            required: ["name", "price"],
            properties: {
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
                name: "Sample Product",
                price: 100,
            },
        },
        UpdateProduct: {
            type: "object",
            minProperties: 1, // Ensures at least one field is provided
            properties: {
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
                name: "Updated Product Name",
            },
        },
    },
    paths: {
        "/products": {
            post: {
                summary: "Create a new product",
                tags: ["Products"],
                description: "Creates a new product with a unique name and a price. A duplicate name will result in a conflict error.",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/CreateProduct",
                            },
                        },
                    },
                },
                responses: {
                    "201": {
                        description: "Product created successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Product",
                                },
                            },
                        },
                    },
                    "400": {
                        description: "Bad request - Missing or invalid fields",
                    },
                    "409": {
                        description: "Conflict error - Product with the same name already exists",
                    },
                },
            },
            get: {
                summary: "Get all products",
                tags: ["Products"],
                description: "Fetches an array of products.",
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
                description: "Retrieves a single product by its unique ID.",
                parameters: [
                    {
                        in: "path",
                        name: "id",
                        required: true,
                        schema: { type: "string" },
                        description: "The unique identifier of the product",
                    },
                ],
                responses: {
                    "200": {
                        description: "Product details",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/Product" },
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
                description: "Updates the details of an existing product by its unique ID. Provide only the fields to be updated. And returns updated product in response",
                parameters: [
                    {
                        in: "path",
                        name: "id",
                        required: true,
                        schema: { type: "string" },
                        description: "The unique identifier of the product product",
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/UpdateProduct" },
                            examples: {
                                updateBoth: {
                                    summary: "Update both name and price",
                                    value: {
                                        name: "Updated Product Name",
                                        price: 150,
                                    },
                                },
                                updateName: {
                                    summary: "Update name only",
                                    value: {
                                        name: "Updated Product Name",
                                    },
                                },
                                updatePrice: {
                                    summary: "Update price only",
                                    value: {
                                        price: 150,
                                    },
                                },
                            },
                        },
                    },
                },
                responses: {
                    "200": {
                        description: "Product updated successfully",
                    },
                    "400": {
                        description: "Bad request - Invalid update data",
                    },
                    "404": {
                        description: "Product not found",
                    },
                    "409": {
                        description: "Conflict error - Product with the same name already exists",
                    },
                },
            },
            delete: {
                summary: "Delete a product by ID",
                tags: ["Products"],
                description: "Deletes a product by its unique ID. And returns deleted product in response",
                parameters: [
                    {
                        in: "path",
                        name: "id",
                        required: true,
                        schema: { type: "string" },
                        description: "The unique identifier of the product",
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
