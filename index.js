'use strict';

var fs = require('fs'),
    fileToOpen = process.argv[2],
    data,
    json;

if (!fileToOpen) {
  throw 'Please pass the path to a file to open';
}

fs.readFile(fileToOpen, 'utf8', function(err, data) {

  data = '["' + data.replace(/\n/g, '", "') + '"]';

  json = JSON.parse(data);

  json = json.reduce(function(prev, current) {

    prev.push({'name': current});

    return prev;

  }, []);

  json = JSON.stringify(json);

  fs.writeFile(process.cwd() + '/' + fileToOpen + '.json', json, function(err) {
      if (err) {
        return console.log(err);
      }

      console.log('File saved.');

  });

});
