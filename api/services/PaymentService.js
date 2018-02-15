const stripe = require("stripe")(
    "sk_test_EkyTVa9qAXXAmTtjiU3H48SG"
  );
  
function submitToGatewayB(currency, price, creditCard){
    console.log("use Gateway B")
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
        stripe.charges.create(paymentInfo, (err, result) => err ? reject(err) : resolve({payment: result, gateway: 'Gateway B'}));
    })
}

function submitToGatewayA(currency, price, creditCard){
    console.log("use Gateway A")
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
    console.log(`makePayment paymentInfo: ${JSON.stringify(paymentInfo, null, 2)}`)

    return new Promise((resolve, reject) => {
        stripe.charges.create(paymentInfo, (err, result) => err ? reject(err) : resolve({payment: result, gateway: 'Gateway A'}));
    })
}

module.exports = {
    makePayment: ({ currency, price, creditCard }) => {
        console.log(`makePayment creditCard: ${JSON.stringify(creditCard, null, 2)}`)

        if(currency === 'HKD') {
            return submitToGatewayB(currency, price, creditCard)
        } else {            
            return submitToGatewayA(currency, price, creditCard)
        }
    },

}
