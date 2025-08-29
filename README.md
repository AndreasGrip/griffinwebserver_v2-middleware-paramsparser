This is a params middleware for griffinwebserver_v2.

It takes the params from requests and put in into req.params as a easy to use object.

Basically



```javascript
const Webserver=require('griffinwebserver_v2');
const params = require('griffinwebserver_v2-middleware-params');

const webserver = new Webserver('www/', 8080, '127.0.0.1');
webserver.start();
```

And you connect to

httsp:/griffinserver.v2/test?first=theFirst&second=theSecond

the request will now have the object params that looks like this 
```javascript
{"first":"theFirst","second":"theSecond"}
```

The code is really minimal (see bellow), but it's easier to have as a module than add each time.

```javascript
return new Promise((resolve, reject) => {
  const url = new URL(`http://${req.headers.host}${req.url}`);
  const params = Object.fromEntries(url.searchParams);
  req.params = params;
  resolve();
})
```
