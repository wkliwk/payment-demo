const stripe = require("stripe")(
    "sk_test_EkyTVa9qAXXAmTtjiU3H48SG"
  );
  
module.exports = {

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
