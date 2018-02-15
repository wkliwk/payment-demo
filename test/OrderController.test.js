var request = require('supertest');

describe('OrdersController', function() {

  describe('#login()', function() {
    it('should redirect to /mypage', function (done) {
      request(sails.hooks.http.app)
        .post('/users/login')
        .send({ name: 'test', password: 'test' })
        .expect(302)
        .expect('location','/mypage', done);
    });
  });

  it('should post data', function(done) {
    const title = faker.commerce.productName()
    const description = faker.commerce.productAdjective()
    const price = faker.commerce.price()

    request(sails.hooks.http.app)
      .post('/api/user/products/product/post')
      .send({
        title,
        description,
        price
      })
      .expect(200)
      .then(() => {

        Product
          .findOne({
            title
          })
          .then(product => {
            chai.assert.strictEqual(product.title, title)
            done()
          })
          .catch(error => done(error))
      })
  })




});