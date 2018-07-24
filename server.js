var cheerio = require("cheerio");
var request = require("request");

// First, tell the console what server.js is doing
console.log("\n******************************************\n" +
            "Scrapes one of the pages of 'awwwards.com' \n" +
            "and produces all of the image and it's source URL" +
            "\n******************************************\n");

// Make request to grab the HTML from `awwards's` clean website section
request("http://www.awwwards.com/websites/clean/", function(error, response, html) {

  // Load the HTML into cheerio
  var $ = cheerio.load(html);

  // Make an empty array for saving our scraped info
  var results = [];

  // With cheerio, look at each award-winning site, enclosed in "figure" tags with the class name "site"
  $("figure.rollover").each(function(i, element) {

    var imgLink = $(element).find("a").find("img").attr("data-srcset").split(",")[0].split(" ")[0];

    // Push the image's URL (saved to the imgLink var) into the results array
    results.push({ link: imgLink });
  });

  // After looping through each element found, log the results to the console
  console.log(results);
});
