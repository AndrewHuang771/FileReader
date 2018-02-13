
// Make sure we got a filename on the command line.
if (process.argv.length != 3) {
  console.log('Usage: node ' + process.argv[1] + ' FILENAME');
  process.exit(1);
}
// Read the file and output a buffer
var fs = require('fs'), filename = process.argv[2];
fs.readFile(filename, function(err, data) {
  
  //If there's an error, exit the process
  if (err) process.exit(1);

  console.log('OK: ' + filename);

  //Object that will be used to generate a histogram
  var histo = {};

  //Initializes the object with 256 bins from 0 to 255
  for(var b=0;b<256;b++){
  	histo[b]=0;
  }

  //Populates the bins
  for (var f=0;f<data.length;f++){
  	for(var g=0;g<256;g++){
  		if(data[f]===g){
  			histo[g]++;
  		}
  	}
  }

  //Deletes the bytes that do not appear
  for(var a=0;a<256;a++){
  	if(histo[a]===0){
  		delete histo[a];
  	}
  }

  //Generates the histogram from the histo object
  var histogram=require("ascii-histogram");
  console.log(histogram(histo, { bar: '=', width: 20, sort: true }));
});

