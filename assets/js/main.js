function submit(){

    const name = $("input[name=name]").val()
    const phone = $("input[name=phone]").val()
    const currency = $("input[name=currency]").val()
    const price = $("input[name=price]").val()
    const holder = $("input[name=holder]").val()
    const number = $("input[name=number]").val()
    const expMonth = $("input[name=expMonth]").val()
    const expYear = $("input[name=expYear]").val()
    const ccv = $("input[name=ccv]").val()
    const gateway = $("input[name=gateway]").val()

    //TODO: get value from form

    $.ajax({
        method: 'POST',
        url: '/api/orders/create',
        data: {name, phone, currency, price, holder, number, expMonth, expYear, ccv, gateway}
    }).then(function(resp){
        // success handling
        console.log(`=====${JSON.stringify(resp, null, 2)}`)
        alert(`SUCCESS \n gateway: ${resp.gateway} \n Customer Name: ${name} \n paymentId: ${resp.payment.id}`)
    }, function(err) {
        // error handling
        alert(`${err.responseText}`)
    })
}

function submitCheckForm(){

    const name = $("input[name=name]").val()
    const paymentId = $("input[name=paymentId]").val()

    //TODO: get value from form

    $.ajax({
        method: 'GET',
        url: '/api/orders',
        data: { name, paymentId }
    }).then(function(resp){
        // success handling
        console.log(`${JSON.stringify(resp, null, 2)}`)
        alert(`SUCCESS \n ${JSON.stringify(resp, null, 2)} \n`)
    }, function(err) {
        // error handling
        alert(`${err.responseText}`)
    })
}

