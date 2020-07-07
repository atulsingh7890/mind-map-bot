const SLACK_BOT_TOKEN =  process.env.SLACK_BOT_TOKEN;
const SLACK_SIGNING_SECRET = process.env.SLACK_SIGNING_SECRET;
const DEBUGGIN_PLAYGROUND_CHANNEL_ID = "C016XHE19MX";
const MIND_MAPZ_METRICS_CHANNEL_ID = "C015W6J3K36";



// Require the Bolt package (github.com/slackapi/bolt)
const { App, ExpressReceiver } = require("@slack/bolt");
//var app = require('express')();

// Create a Bolt Receiver
const receiver = new ExpressReceiver({
  signingSecret: SLACK_SIGNING_SECRET
});

const app = new App({
  token: SLACK_BOT_TOKEN,
  receiver
});

receiver.router.get("/post_mind_mapz_metrics", function(req, res) {
  publishMessage(MIND_MAPZ_METRICS_CHANNEL_ID, "");
  res.send("hello world");
});

function getTodaysDate() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + "-" + dd + "-" + yyyy;
}

// Post a message to a channel your app is in using ID and message text
async function publishMessage(id, text) {
  try {
    // Call the chat.postMessage method using the built-in WebClient
    const result = await app.client.chat.postMessage({
      // The token you used to initialize your app
      token: SLACK_BOT_TOKEN,
      channel: id,
      text: text,
      blocks: [
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*MetricsOfTheDay : 07-07-2020*"
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*<https://tinyurl.com/yctjjdkg|High Level Design Video Stats>*\n Count of Videos Watched\nShows *Total # of Days System Design Vidoes Covered*"
			},
			"accessory": {
				"type": "image",
				"image_url": "https://tinyurl.com/yctjjdkg",
				"alt_text": "System Design Videos Converage"
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*<https://tinyurl.com/ycywnmeo|Last 3 and 5 Days Question Solved Stats>*\n Overall Question Solved\nShows *Question Solved in Last 3 Days and 5 Days*"
			},
			"accessory": {
				"type": "image",
				"image_url": "https://tinyurl.com/ycywnmeo",
				"alt_text": "Last 3 Days and 5 Days Question Solved Metrics"
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*<https://tinyurl.com/ycujdxrr|Last 15 Days>*\n Question Solved in Last 15 Days\nShows *Active Person in Last 15 Days*"
			},
			"accessory": {
				"type": "image",
				"image_url": "https://tinyurl.com/ycujdxrr",
				"alt_text": "Question Solved in Last 15 Days"
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*<https://tinyurl.com/y8nkdrs9|Cumulative Solved Question Stats>*\n Overall Question Solved\nShows *Total Questions a Person has solved till now*"
			},
			"accessory": {
				"type": "image",
				"image_url": "https://tinyurl.com/y8nkdrs9",
				"alt_text": "Total Questions Solved"
			}
		},
		{
			"type": "divider"
		}
	]
      // You could also use a blocks[] array to send richer content
    });

    // Print result, which includes information about the message (like TS)
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  // All the room in the world for your code
  console.log("atul singh");

  console.log("⚡️ Bolt app is running!");
})();
