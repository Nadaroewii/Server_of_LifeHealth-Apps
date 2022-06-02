const ArrayList = require('arraylist');
const BigInteger = require('big-integer');

listNumber = new ArrayList();
function getBilanganAcak(pesan, p)
{
	var pp = parseInt(p) - 2;
	console.log("nilai pp: " + pp)
	for (let i = 0; i < pesan.length; i++)
        {
			var rand = parseInt((pp * Math.random()));
			listNumber.push(rand) 
		}
		return listNumber;
	}

module.exports = {
    getBilanganAcak
};