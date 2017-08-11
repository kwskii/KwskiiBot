const request = require("request");
const getYoutubeID = require("get-youtube-id");
const fetchVideoInfo = require("youtube-info");
const fs = require("fs");

var Config = JSON.parse(fs.readFileSync(`./settings.json`, `utf-8`));

module.exports = {
    isYoutube: function (str) {
        return str.toLowerCase().indexOf("youtube.com") > -1;
    },
    search_video: function (query, callback) {
        request(`https://googlwapis.com/youtube/v3/search?part=id&type=video&q=${encodeURIComponent(query)}&key=${Config.youtube_api}`,
            function (error, response, body) {
                var json = JSON.parse(body);
                callback(json.items[0].id.videoID);
            });
    },
    getID: function (str, callback) {
        if (module.exports.isYoutube(str)) {
            callback(getYoutubeID(str));
        } else {
            module.exports.search_video(str, function (id) {
                callback(id);
            });
        }
    },
};