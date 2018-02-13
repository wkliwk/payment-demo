const stripe = require("stripe")(
    "sk_test_EkyTVa9qAXXAmTtjiU3H48SG"
  );
  
module.exports = {

    makePayment: ({ currency, price, creditCard }) => {
        console.log(`makePayment creditCard: ${JSON.stringify(creditCard, null, 2)}`)

        const paymentInfo = {
            currency,
            amount: price,
            source: {
                object: 'card',
                number: creditCard.number,
                exp_month: creditCard.expMonth,
                exp_year: creditCard.expYear,
                cvc: creditCard.cvv,
                name: creditCard.holder
            },
            description: `Charge for ${creditCard.holder}`
        }
        // const idempotencyKey = { idempotency_key: "dDzXgXlso2MJ7mVG" }// todo: gen uuid 
        console.log(`makePayment paymentInfo: ${JSON.stringify(paymentInfo, null, 2)}`)

        return new Promise((resolve, reject) => {
            stripe.charges.create(paymentInfo, (err, result) => err ? reject(err) : resolve(result));
        });
    },

    saveOrder: ({ name, phone, currency, price }) => {
        return new Promise((resolve, reject) => {
            try {
                Orders
                    .create({ name, phone, currency, price })
                    .exec((err, result) => {
                        if(err){
                            return reject(err);
                        }
                        return resolve(result); // success
                    });
            } catch (err) {
                reject(err);
            }
        })
    },

    updateOrderWithPaymentId: ({ orderId, paymentId }) => {
        console.log(`updateOrderWithPaymentId ${orderId}, paymentId ${paymentId} `)
        return new Promise((resolve, reject) => {
            try {
                Orders
                    .update({ id: orderId }, { paymentId })
                    .exec((err, result) => {
                        if(err){
                            return reject(err);
                        }
                        return resolve(result);
                    });
            } catch (err) {
                reject(err);
            }
        })
    },

    getOrder: (name, paymentId) => {
        return new Promise((resolve, reject) => {
            try {
                Orders
                    .findOne({ name, paymentId })
                    .exec((err, result) => {
                        if(err){
                            return reject(err);
                        }
                        return resolve(result);
                    });
            } catch (err) {
                reject(err);
            }
        })

    }

}