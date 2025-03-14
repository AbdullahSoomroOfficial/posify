"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    schemas: {
        Order: {
            type: "object",
            properties: {
                _id: {
                    type: "string",
                    description: "The auto-generated id of the order",
                },
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
                            productId: "67bf27fc2cb705226a66595f",
                            quantity: 2,
                        },
                        {
                            productId: "78bf27fc2cb705226a66595f",
                            quantity: 12,
                        },
                        {
                            productId: "67bf27fc2cb705226a23595f",
                            quantity: 1,
                        },
                    ],
                },
                discount: {
                    type: "number",
                    description: "Minimum 0 and Maximum 100",
                    example: 10,
                },
            },
        },
        CreateOrder: {
            type: "object",
            required: ["items", "discount"],
            properties: {
                items: {
                    type: "array",
                    items: {
                        type: "object",
                        required: ["productId", "quantity"],
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
                            productId: "67bf27fc2cb705226a66595f",
                            quantity: 2,
                        },
                        {
                            productId: "78bf27fc2cb705226a66595f",
                            quantity: 12,
                        },
                        {
                            productId: "67bf27fc2cb705226a23595f",
                            quantity: 1,
                        },
                    ],
                },
                discount: {
                    type: "number",
                    description: "Minimum 0 and Maximum 100",
                    example: 10,
                },
            },
        },
        UpdateOrder: {
            type: "object",
            required: ["items", "discount"],
            properties: {
                items: {
                    type: "array",
                    items: {
                        type: "object",
                        required: ["productId", "quantity"],
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
                            productId: "67bf27fc2cb705226a66595f",
                            quantity: 2,
                        },
                        {
                            productId: "78bf27fc2cb705226a66595f",
                            quantity: 12,
                        },
                        {
                            productId: "67bf27fc2cb705226a23595f",
                            quantity: 1,
                        },
                    ],
                },
                discount: {
                    type: "number",
                    description: "Minimum 0 and Maximum 100",
                    example: 10,
                },
            },
        },
    },
    paths: {
        "/orders": {
            post: {
                summary: "Create a new order",
                description: "Creates a new order with a unique ID.",
                tags: ["Orders"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/CreateOrder",
                            },
                        },
                    },
                },
                responses: {
                    "201": {
                        description: "Order created successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Order",
                                },
                            },
                        },
                    },
                    "400": {
                        description: "Bad request",
                    },
                },
            },
            get: {
                summary: "Get all orders",
                description: "Fetches an array of orders.",
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
                description: "Retrieves a single order by its unique ID.",
                parameters: [
                    {
                        in: "path",
                        name: "id",
                        required: true,
                        schema: {
                            type: "string",
                        },
                        description: "The unique identifier of the order",
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
                        description: "The unique identifier of the order",
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/UpdateOrder",
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
                description: "Deletes a ordeer by its unique ID. And returns deleted order in response",
                parameters: [
                    {
                        in: "path",
                        name: "id",
                        required: true,
                        schema: {
                            type: "string",
                        },
                        description: "The unique identifier of the order",
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
