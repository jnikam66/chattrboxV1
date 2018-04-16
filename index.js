/* eslint-disable no-unused-vars */
/*eslint-env node*/
var http = require("http");
var fs = require("fs");
var extract = require("./extract");
var wss = require("./websockets-server");
var fileExtension = require("file-extension");
var handleError = function(err, res) {
  fs.readFile("app/error.html", function(err, data) {
    res.writeHead(400, {"Content-Type": "text/html" });
    res.end(data);
  });
};
var server = http.createServer(function(req, res) {
  /*eslint no-console: ["error", { allow: ["warn", "error","log"] }] */
  console.log("Responding to a request.");
  var filePath = extract(req.url);
  fs.readFile(filePath, function(err, data) {
    if (err) {
      handleError(err, res);
      return;
    } else {
      if (fileExtension(req.url) == "pdf") {
        res.setHeader("Content-Type", "application/pdf");
      } else if (fileExtension(req.url) == "mp3") {
        res.setHeader("Content-Type", "audio/mpeg");
      } else if (fileExtension(req.url) == "mp4") {
        res.setHeader("Content-Type", "video/mp4");
      } else if (fileExtension(req.url) == "txt") {
        res.setHeader("Content-Type", "text/plain");
      }
      res.end(data);
    }
  });
});
server.listen(3000);
