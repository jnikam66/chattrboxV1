/*eslint no-undef: "error"*/
/*eslint-env node*/
var path = require("path");
var extractFilePath = function(url) {
  var filePath;
  var fileName = "index.html";
  if (url.length > 1) {
    fileName = url.substring(1);
  }
  /*eslint no-console: ["error", { allow: ["warn", "error","log"] }] */
  console.log("The fileName is: " + fileName);
  filePath = path.resolve(__dirname, "app", fileName);
  return filePath;
};

module.exports = extractFilePath;
