/**
 * OrdersController
 *
 * @description :: Server-side logic for managing orders
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    createPayment: async (req, res) => {
        console.log(req.allParams())
        const { name, phone, currency, price, ...creditCard } = req.allParams()

        const orderId = await OrdersService
            .saveOrder({ name, phone, currency, price })
            .then(order => { return order.id })
            .catch(err => res.serverError(err));

        const paymentId = await PaymentService
            .makePayment({ currency, price, creditCard })
            .then(payment => { return payment.id })
            .catch(err => res.serverError(err));

        const result = await OrdersService
            .updateOrderWithPaymentId({ orderId, paymentId })
            .catch(err => { return res.serverError(err) });

        return res.ok(result) 
    },
        
    getOrder: async(req, res) => {
        OrdersService
            .getOrderAndCached(req.allParams())
            .then(order => { return res.json(order) })
            .catch(err => res.serverError(err));
    },
};

