if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

let PORT = process.env.PORT || 3000;

module.exports={
  PORT
}