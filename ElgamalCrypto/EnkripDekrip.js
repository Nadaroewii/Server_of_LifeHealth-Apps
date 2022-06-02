const ArrayList = require('arraylist');
const BigInteger = require('big-integer');

function getEnkripsi(chrASCII, rnd, g, p, y, pesan)
	{
		for (var i = 0; i < pesan.length; i++)
		{
			var m = BigInteger(chrASCII);
			var k = BigInteger(rnd);
			var gamma = g.modPow(k, p);
			var delta = y.pow(parseInt(k)).multiply(m).mod(p);
			//console.log(gamma);
			//console.log(delta);
		}
		return gamma.toString() + " " + delta.toString() + " ";
	}
function getDekripsi(nGamma, nDelta, p, x, pesan)
	{
		for (var i = 0; i < pesan.length; i++)
		{
			var a = BigInteger(nGamma);
			var b = BigInteger(nDelta);
			var m = b.multiply(a.pow(parseInt(p) - 1 - parseInt(x))).mod(p);
			var ma = parseInt(m);
			//console.log("nilai " + m);
			//console.log("nilaii " + ma);

			var chr = String.fromCharCode(ma);
		}
		return chr;
	}

module.exports = {
    getEnkripsi,
    getDekripsi
}