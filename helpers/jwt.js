const jwt = require('jsonwebtoken');

const generateJWT = (id, name) => {

  const payload = { id, name };
  // Turning the function into a promise to use the async await in the controller
  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '10h'
    }, (err, token) => {
      
      if (err) {
        console.log(err);
        reject('Couldn"t generate the token');
      } else {
        resolve(token);
      }
  
    });

  });

}

module.exports = {
  generateJWT
}
