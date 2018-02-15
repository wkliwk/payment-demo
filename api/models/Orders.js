/**
 * Orders.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    payment: {
      type: 'json'
    },
    name: {
      type: 'string',
    },
    phone: {
      type: 'string',
    },
    currency: {
      type: 'string',
      enum: ['HKD', 'USD', 'AUD', 'EUR', 'JPY', 'CNY'],
    },
    price: {
      type: 'float',
    },
  },  
  connection: 'mongodb'
};

