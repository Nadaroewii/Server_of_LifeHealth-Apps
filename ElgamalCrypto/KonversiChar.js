const ArrayList = require('arraylist');

var listChar = new ArrayList();
function getCharASCII(pesan)
	{
		for (var i = 0; i < pesan.length; i++)
		{
			var chr = pesan.charAt(i);
			var inn = chr.charCodeAt(0);
			listChar.push( inn ) 
		}
		return listChar;
	}

module.exports = {
    getCharASCII
}