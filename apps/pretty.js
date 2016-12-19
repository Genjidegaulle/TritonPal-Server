


function landing (req, res) {
	  res.sendFile(__dirname + '/test.css');
}

module.exports = {
	landing: landing,
}

