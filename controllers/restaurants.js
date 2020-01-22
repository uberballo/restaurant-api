const restaurantRouter = require('express').Router();
const fs = require('fs');

const toRad = value => {
  return (value * Math.PI) / 180;
};

const filterByQuery = query => {
  return restaurant => {
    const allText = restaurant.description + restaurant.name + restaurant.tags;
    return allText.includes(query);
  };
};

const filterByDistance = queryLat => {
  return queryLon => {
    return restaurant => {
      const restaurantLat = restaurant.location[1];
      const restaurantLon = restaurant.location[0];
      const R = 6371e3;
      const f1 = toRad(restaurantLat);
      const f2 = toRad(queryLat);
      const df = toRad((queryLat - restaurantLat))
      const dl = toRad((queryLon - restaurantLon))
      var a = Math.sin(df / 2) * Math.sin(df / 2) + Math.cos(f1) * Math.cos(f2) * Math.sin(dl / 2) * Math.sin(dl / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;
      return d<3000.0;
    };
  };
};

restaurantRouter.get('/restaurants/search', async (request, response) => {
  try {
    const body = request.query;
    const { q, lat, lon } = body;
    
    const rawdata = fs.readFileSync('./restaurants.json');
    const restaurants = JSON.parse(rawdata).restaurants;

    const filteredByQuery= restaurants.filter(filterByQuery(q));
    const filteredByDistance = filteredByQuery.filter(filterByDistance(lat)(lon));

    response.status(200).json(filteredByDistance);
  } catch (e) {
    response.json({error: e})
  }
});

module.exports = restaurantRouter;
