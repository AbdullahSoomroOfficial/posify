/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the product
 *         name:
 *           type: string
 *           description: The name of the product
 *         price:
 *           type: number
 *           description: The price of the product
 *       example:
 *         _id: d5fE_asz
 *         name: Sample Product
 *         price: 100
 *     Stock:
 *       type: object
 *       required:
 *         - productId
 *         - quantity
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the stock
 *         productId:
 *           type: string
 *           description: The id of the product
 *         quantity:
 *           type: number
 *           description: The quantity of the product in stock
 *       example:
 *         _id: d5fE_asz
 *         productId: d5fE_asz
 *         quantity: 50
 *     Order:
 *       type: object
 *       required:
 *         - items
 *         - subtotal
 *         - discount
 *         - totalAmount
 *       properties:
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: The id of the product
 *               price:
 *                 type: number
 *                 description: The price of the product
 *               quantity:
 *                 type: number
 *                 description: The quantity of the product
 *               lineTotal:
 *                 type: number
 *                 description: The total price for the line item
 *         subtotal:
 *           type: number
 *           description: The subtotal of the order
 *         discount:
 *           type: number
 *           description: The discount applied to the order
 *         totalAmount:
 *           type: number
 *           description: The total amount of the order
 *       example:
 *         items:
 *           - productId: d5fE_asz
 *             price: 100
 *             quantity: 2
 *             lineTotal: 200
 *         subtotal: 200
 *         discount: 10
 *         totalAmount: 190
 */
