const stripe = require("stripe")(
    "sk_test_EkyTVa9qAXXAmTtjiU3H48SG"
  );
  
module.exports = {

    saveOrder: async ({ name, phone, currency, price }) => {
        return new Promise((resolve, reject) => {
            try {
                Orders
                    .create({ name, phone, currency, price })
                    .exec((err, result) => {
                        return err ? reject(err) : resolve(result);
                        
                        // if(err){
                        //     return reject(err);
                        // }
                        // return resolve(result); // success
                    });
            } catch (err) {
                reject(err);
            }
        })
    },

    updateOrderWithPaymentId: async ({ orderId, paymentId }) => {
        console.log(`updateOrderWithPaymentId ${orderId}, paymentId ${paymentId} `)
        return new Promise((resolve, reject) => {
            try {
                Orders
                    .update({ id: orderId }, { paymentId })
                    .exec((err, result) => {
                        return err ? reject(err) : resolve(result);
                        
                        // if(err){
                        //     return reject(err);
                        // }
                        // return resolve(result);
                    });
            } catch (err) {
                reject(err);
            }
        })
    },

    getOrderByNameAndPaymentId: async ({ name, paymentId }) => {
        return new Promise((resolve, reject) => {
            try {
                Orders
                    .find({ paymentId: paymentId })
                    .limit(1)
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
    
    async getOrderAndCached(params) {
        const {name, paymentId} = params;
        const ttl = 300
        const key = `order:${name}:${paymentId}`
        console.log(`key = ${key}`)

        // find from cache redis 
        console.log("find from cache redis")
        const cachedOrder = await CacheService.get(key)

        // find orderBy paymentId and name in mongodb 
        console.log("find orderBy paymentId and name in mongodb")
        if(!cachedOrder) {
            const order = await this.getOrderByNameAndPaymentId({ name, paymentId })
            // cache result to redis
            console.log("cache result to redis")
            CacheService.set(key, ttl, JSON.stringify(order[0])) //TODO side effect 
            console.log(`order 0 = ${JSON.stringify(order[0])}`)
            return order[0]
        }

        console.log(`result = ${cachedOrder}`)
        return JSON.parse(cachedOrder);
    }

}

