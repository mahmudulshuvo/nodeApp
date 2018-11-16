var express = require("express");
var path = require("path");
var moment = require("moment");
const bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const middlewares = [
  // ...
  bodyParser.urlencoded()
];

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

var makeschoolTweets = [];
var yCombinatorTweets = [];
var newsYCombinatorTweets = [];
var makeschoolTime = [];
var yCombinatorTime = [];
var newsYCombinatorTime = [];
var makeschoolUserMentions = [];
var yCombinatorUserMentions = [];
var newsYCombinatorUserMentions = [];
var retweets = [];

const TwitterServer = require("./TwitterServer.js");
const tw = new TwitterServer({
  consumer_key: "",
  consumer_secret: "",
  access_token_key: "",
  access_token_secret: ""
});

// now let's get our timeline from the new twitter server
tw.timeline(
  "makeschool",
  "statuses/user_timeline.json?count=30&screen_name=makeschool"
)
  .then(response => {
    makeschoolTweets = response.data;
    // console.log(makeschoolTweets[0].entities.user_mentions[0].screen_name);
    for (var i = 0; i < makeschoolTweets.length; i++) {
      makeschoolTime.push(
        moment(
          makeschoolTweets[i].created_at,
          "ddd MMM DD HH:mm:ss Z YYYY"
        ).fromNow()
      );
      //console.log(makeschoolTweets[i].entities.user_mentions);
      if (makeschoolTweets[i].entities.user_mentions.length > 0) {
        makeschoolUserMentions[i] = "";
        for (
          var j = 0;
          j < makeschoolTweets[i].entities.user_mentions.length;
          j++
        ) {
          makeschoolUserMentions[i] +=
            "@" +
            makeschoolTweets[i].entities.user_mentions[j].screen_name +
            " ";
        }
      } else {
        makeschoolUserMentions[i] = "";
        makeschoolUserMentions[i] += "No user mentioned";
      }
    }
  })
  .catch(err => {
    console.log("ERROR", err);
  });

tw.timeline(
  "ycombinator",
  "statuses/user_timeline.json?count=30&screen_name=ycombinator"
)
  .then(response => {
    yCombinatorTweets = response.data;
    for (var i = 0; i < yCombinatorTweets.length; i++) {
      yCombinatorTime.push(
        moment(
          yCombinatorTweets[i].created_at,
          "ddd MMM DD HH:mm:ss Z YYYY"
        ).fromNow()
      );

      if (yCombinatorTweets[i].entities.user_mentions.length > 0) {
        yCombinatorUserMentions[i] = "";
        for (
          var j = 0;
          j < yCombinatorTweets[i].entities.user_mentions.length;
          j++
        ) {
          yCombinatorUserMentions[i] +=
            "@" +
            yCombinatorTweets[i].entities.user_mentions[j].screen_name +
            " ";
        }
      } else {
        yCombinatorUserMentions[i] = "";
        yCombinatorUserMentions[i] += "No user mentioned";
      }
    }
  })
  .catch(err => {
    console.log("ERROR", err);
  });

tw.timeline(
  "newsycombinator",
  "statuses/user_timeline.json?count=30&screen_name=newsycombinator"
)
  .then(response => {
    newsYCombinatorTweets = response.data;
    for (var i = 0; i < newsYCombinatorTweets.length; i++) {
      newsYCombinatorTime.push(
        moment(
          newsYCombinatorTweets[i].created_at,
          "ddd MMM DD HH:mm:ss Z YYYY"
        ).fromNow()
      );

      if (newsYCombinatorTweets[i].entities.user_mentions.length > 0) {
        newsYCombinatorUserMentions[i] = "";
        for (
          var j = 0;
          j < newsYCombinatorTweets[i].entities.user_mentions.length;
          j++
        ) {
          newsYCombinatorUserMentions[i] +=
            "@" +
            newsYCombinatorTweets[i].entities.user_mentions[j].screen_name +
            " ";
        }
      } else {
        newsYCombinatorUserMentions[i] = "";
        newsYCombinatorUserMentions[i] += "No user mentioned";
      }
    }
  })
  .catch(err => {
    console.log("ERROR", err);
  });

app.get("/", function(req, res, next) {
  res.render("index", {
    title: "Express",
    makeschoolTweets: makeschoolTweets,
    yCombinatorTweets: yCombinatorTweets,
    newsYCombinatorTweets: newsYCombinatorTweets,
    makeschoolTime: makeschoolTime,
    yCombinatorTime: yCombinatorTime,
    newsYCombinatorTime: newsYCombinatorTime,
    makeschoolUserMentions: makeschoolUserMentions,
    yCombinatorUserMentions: yCombinatorUserMentions,
    newsYCombinatorUserMentions: newsYCombinatorUserMentions
  });
});

app.get("/settings", function(req, res, next) {
  res.render("settings", {
    title: "settings"
  });
});

// app.post("/", (req, res) => {
//   console.log("function called", req.body);

// res.render('contact', {
//   data: req.body, // { message, email }
//   errors: {
//     message: {
//       msg: 'A message is required'
//     },
//     email: {
//       msg: 'That email doesn‘t look right'
//     }
//   }
// })
// });

app.listen(3000, () => {
  console.log("Server started at port 3000...");
});
