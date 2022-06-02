const ArrayList = require('arraylist');
const BigInteger = require('big-integer');
const bk = require('./GenerateKunci/BuatKunci');
const ek = require('./GenerateKunci/elgamalnew');
const Base64 = require('js-base64');

function GenerateKey() {
        var keyarray = []
        var p = BigInteger(ek.pnum);
        var g = BigInteger(ek.smallprim);
        var x = BigInteger(ek.privatkey);

        if (parseInt(p) < 225) {
            console.log("Bilangan Harus Lebih Besar Dari 255");
        } else if (parseInt(g) < 1 | parseInt(g) >= parseInt(p) - 1) {
           console.log("Nilai g : 1 < g <= p-1");
        } else if (parseInt(x) < 1 | parseInt(x) >= parseInt(p) - 2) {
            do {
                var x = BigInteger(ek.privatkey);
            } while(parseInt(x) > 1 | parseInt(x) < parseInt(p) - 2);
        } else {
            bk.setPrima(parseInt(p));
            if (bk.isPrima() == false) {
                console.log(p + " bukan bilangan prima");
            } else {
                y = bk.getKunci(p, g, x);
            }
        }
        var pnew = Base64.encode(p.toString());
        keyarray.push(pnew);
        var gnew = Base64.encode(g.toString()); 
        keyarray.push(gnew);
        var ynew = Base64.encode(y.toString());
        keyarray.push(ynew);
        //return Base64.encode(keyarray.toString());
        return keyarray;
    }

generatekey = GenerateKey();

module.exports = {
    generatekey
}