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
