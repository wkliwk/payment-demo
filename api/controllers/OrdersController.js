/**
 * OrdersController
 *
 * @description :: Server-side logic for managing orders
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    createPayment: (req, res) => {
        const { name, phone, currency:USD, price, ...creditCard } = req.allParams()

        const orderId = OrdersService
            .saveOrder({ name, phone, currency, price })
            .then(order => { return order.id })
            .catch(err => res.serverError(err));

        const paymentId = OrdersService
            .makePayment({ currency, price, creditCard })
            .then(payment => { return payment.id })
            .catch(err => res.serverError(err));

        OrdersService.updateOrderWithPaymentId({orderId, paymentId})
            .then(result => { 
                console.log(`result ${result}`)
                return res.ok(result) 
            })
            .catch(err => { return res.serverError(err) });

        // Promise
        //     .all([orderId, paymentId])
        //     .then(result => { return {orderId: results[0], paymentId: results[1]} })
        //     .then(results => res.ok()) // todo array????
        //     .catch(err => res.serverError(err));
    },
        
    getOrder: (req, res) => {
        // const { name, paymentId } = req.allParams()
        OrdersService
            .getOrderByNameAndPaymentId(req.params)
            .then(order => { return res.ok(result) })
            .catch(err => res.serverError(err));


    },
};

