require("dotenv").config({ path: __dirname + "/.env" });
const { twitterClient } = require("./twitterClient.js");
const CronJob = require("cron").CronJob;
const { download } = require("./utilities");

const tweet = async () => {

    const uri = "https://i.imgur.com/Zl2GLjnh.jpg";
    const filename = "image.png";

    download(uri, filename, async function(){
        try {
            const mediaId = await twitterClient.v1.uploadMedia("./image.png");
            console.log(mediaId);
            await twitterClient.v2.tweet({
                text: "Hello world! This is an image in Ukraine!",
                media: {
                    media_ids: [mediaId]
                }
            });
        } catch (e) {
            console.log(e)
        }
    });
}

// const cronTweet = new CronJob("30 * * * * *", async () => {
    tweet();
// });
  
// cronTweet.start();