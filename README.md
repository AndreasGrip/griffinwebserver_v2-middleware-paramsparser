This is a params middleware for griffinwebserver_v2.

It takes the params from requests and put in into req.params as a easy to use object.

If there is if there is multiple examples of the same param, an array will be created instead of the primitive value. ( ?id=1&id=3 will generate id: ["1","3"] )

Basically

```javascript
const Webserver=require('griffinwebserver_v2');
const params = require('griffinwebserver_v2-middleware-params');

const webserver = new Webserver('www/', 8080, '127.0.0.1');
webserver.start();
```

And you connect to

httsp:/griffinserver.v2/test?first=theFirst&second=theSecond&second=anotherSecond

the request will now have the object params that looks like this

```javascript
{"first":"theFirst","second":["theSecond", "anotherSecond"]}
```

The code is really minimal (see bellow), but really 

 than add each time.

```javascript
function middlewareParamsParser(req, res) {
  return new Promise((resolve, reject) => {
    const url = new URL(`http://${req.headers.host}${req.url}`);
    const params = {};
    for (const [key, value] of url.searchParams) {
      // if not already set, set it as a primitive value.
      if (!params[key]) {
        params[key] = value;
      } else {
        // if set but not an array, convert it into an array.
        if (!Array.isArray(params[key])) {
          params[key] = [params[key]];
        }
        // if an array push the value into the array.
        if (Array.isArray(params[key])) {
          // if already an array just push it.
          params[key].push(value);
        }
      }
    }
    req.params = params;
    resolve();
  });
}

module.exports = middlewareParamsParser;

```
