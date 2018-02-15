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
        if(!name) {
            return res.badRequest("name should not null")
        }
        if(!phone) {
            return res.badRequest("phone should not null")
        }
        if(!currency) {
            return res.badRequest("currency should not null")
        }
        if(!price) {
            return res.badRequest("price should not null")
        }
        if(!creditCard) {
            return res.badRequest("creditCard should not null")
        }

        const orderId = await OrdersService
            .saveOrder({ name, phone, currency, price })
            .then(order => { return order.id })
            .catch(err => res.serverError(err));

        const { payment, gateway } = await PaymentService
            .makePayment({ currency, price, creditCard })
            .catch(err => res.serverError(err));

        console.log(`payment ${payment}`)

        const result = await OrdersService
            .updateOrderWithPayment({ orderId, payment })
            .catch(err => { return res.serverError(err) });

        return res.ok({ ...result, gateway }) 
    },
        
    getOrder: async(req, res) => {
        OrdersService
            .getOrderAndCached(req.allParams())
            .then(order => { return res.json(order) })
            .catch(err => res.serverError(err));
    },
};

