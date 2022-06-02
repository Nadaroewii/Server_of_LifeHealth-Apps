const ArrayList = require('arraylist');
const BigInteger = require('big-integer');

function getKunci(p, g, x)
	{
		y = g.modPow(x, p);
		return y;
	}
function setPrima(bilanganPrima)
	{
		bilanganPrima = bilanganPrima;
	}
function isPrima()
	{
		for (var i = 3; i < setPrima(); i += 2)
		{
			if (bilanganPrima % i == 0)
			{
				var cek = false;
				break;
			}
			else
			{
				var cek = true;
			}
		}
		return cek;
	}


module.exports = {
    getKunci,
    isPrima,
    setPrima
}