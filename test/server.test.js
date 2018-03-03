import request from 'supertest';

let request1 = request('http://localhost:8001');

describe ('server', () => {
  it.only('should return products from the same category', function(done){
    request1.get('/product/2')
    .expect(201)
    .expect((res) => {
      let data = res.body;
      data.forEach((n) => {
        var containsAorB = n.category.includes("8inches") || n.category.includes("phone2")
        expect(containsAorB).toBe(true)
      });
    })
    .end(done);
  })
});
