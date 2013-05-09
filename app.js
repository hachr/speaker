/**
 * Simple app that will play audio.
 */
var lame = require('lame'), Speaker = require('speaker');

function stream(host, path) {
  require('http').get({
    "host": host,
    "path": path
  }, function (res) {
    play(res);
    res.on('end', function () {
      console.log('done');
    });
  });
}

function loadFile(file) {
  var fs = require('fs').createReadStream(file);
  play(fs);
}

function play(input) {
  input.pipe(new lame.Decoder())
    .on('format', function (format) {
      console.log("Format %s", JSON.stringify(format));
      this.pipe(new Speaker(format));
    });
}


/*
 * Start it
 */

if (process.argv.length != 3) {
  var host = "freedownloads.last.fm";
  var path = "/download/494669779/Calgary.mp3";
  stream(host, path);
} else {
  loadFile(process.argv[2]);
}
