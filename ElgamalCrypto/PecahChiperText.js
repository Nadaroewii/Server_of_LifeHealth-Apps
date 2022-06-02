const ArrayList = require('arraylist');
const BigInteger = require('big-integer');


var pGamma = ArrayList();
var pDelta = ArrayList();
var pChipper = ArrayList();
var pecah = ArrayList();
function setChiper(chiper)
{
	pecah = [];
	pecah = chiper.split(" ");
	pecah.splice(-1);
	for (var i = 0; i < pecah.length; i++)
	{
		if (i % 2 == 0)
		{
			(pGamma.push(pecah[i]) > 0);
		}
		else
		{
			(pDelta.push(pecah[i]) > 0);
		}
	}
	pChipper = [];
	pChipper.push(pGamma);
	pChipper.push(pDelta);
	pGamma = [];
	pDelta = [];
	//console.log(pChipper);
	return pChipper;
	}
function getGamma()
	{
		return pGamma;
	}
function getDelta()
	{
		return pDelta;
	}

module.exports = {
   getGamma, getDelta, setChiper
}