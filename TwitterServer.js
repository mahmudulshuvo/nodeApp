const Twitter = require("twitter-promise");

class TwitterServer extends Twitter {
  constructor(auth) {
    super(auth);
  }

  timeline(screen_name, path) {
    return new Promise((resolve, reject) => {
      // because we extend Twitter into TwitterServer all it's methods/properties are inherited into the 'this' scope.
      this.get({
        path: path,
        params: { screen_name }
      })
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}

module.exports = TwitterServer;
