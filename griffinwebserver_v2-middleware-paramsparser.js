function middlewareBodyParser(req, res) {
  return new Promise((resolve, reject) => {
    const url = new URL(`http://${req.headers.host}${req.url}`);
    const params = Object.fromEntries(url.searchParams);
    req.params = params;
    resolve();
  })
}

module.exports = middlewareBodyParser;