const request = require('supertest')
const app = require('../app')
const assert = require('assert')

describe('Restaurant query test', () =>{

     it('query returns only one restaurant in range', async () => {
         const q = 'sushi' 
         const lat =60.14225 ;
         const lon =24.93147 ;
         const uri = `/restaurants/search?q=${q}&lat=${lat}&lon=${lon}`;
      request(app)
        .get(uri)
        .expect('Content-Type', /json/)
        .expect('Content-Length', '385')
        .expect(200)
        .then(response =>{
            assert(response.body[0].name, "Hanko Sushi Stockmann")
        })
    });

     it('query returns restaurants with word sushi in it', async () => {
         const q = 'sushi' 
         const lat =60.17045;
         const lon =24.93147 ;
         const uri = `/restaurants/search?q=${q}&lat=${lat}&lon=${lon}`;
      request(app)
        .get(uri)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response =>{
            response.body.forEach(e=> {
                const allText = e.description + e.name + e.tags
                assert(allText.includes(q))
            });
        })
    });

     it('query with invalid keyword doesnt return anything', async () => {
         const q = 'NONESHOULDBEFOUND' 
         const lat =60.17045;
         const lon =24.93147 ;
         const uri = `/restaurants/search?q=${q}&lat=${lat}&lon=${lon}`;
        //Return content is [], thus length 2
      request(app)
        .get(uri)
        .expect('Content-Type', /json/)
        .expect('Content-Length', '2')
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
        });
    });

     it('query with invalid lat and lon doesnt return anything', async () => {
         const q = 'sushi' 
         //1 increment in lat should return empty array
         const lat =61.17045;
         const lon =24.93147 ;
         const uri = `/restaurants/search?q=${q}&lat=${lat}&lon=${lon}`;

      request(app)
        .get(uri)
        .expect('Content-Type', /json/)
        .expect('Content-Length', '2')
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
        });
    });

     it('empty query', async () => {
         //1 increment in lat should return empty array
         const uri = `/restaurants/search`;

      request(app)
        .get(uri)
        .expect('Content-Type', /json/)
        .expect('Content-Length', '2')
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
        });
    });
})