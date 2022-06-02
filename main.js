const ArrayList = require('arraylist');
const BigInteger = require('big-integer');
const ed = require('./ElgamalCrypto/EnkripDekrip');
const bk = require('./ElgamalCrypto/GenerateKunci/BuatKunci');
const ek = require('./ElgamalCrypto/GenerateKunci/elgamalnew');
const converter = require('./ElgamalCrypto/KonversiChar');
const number = require('./ElgamalCrypto/BilanganAcak'); 
const pct = require('./ElgamalCrypto/PecahChiperText');
const binar = require('./ElgamalCrypto/Bytelength');
//const dt = require('./ElgamalCrypto/datadummy');
const Base64 = require('js-base64');
const { string } = require('mathjs');

class Main {
    static main(args){
       // var pesan = dt.datacoba;
        //var pesan = "Halo percobaan enkripsi , dan nama saya nada roewi adalah mahasiswa dengan nrp 1210181021 coba pesan, dataaktv = jalan normal, durasi = 10 menit, kalori = 200 kal, jarak 10 km, long 162.584,lat 82.567"
        // var pesan = "Halo percobaan enkripsi , dan nama saya nada roewi adalah mahasiswa dengan nrp 1210181021 coba pesan";
        var pesan = "https://firebasestorage.googleapis.com/v0/b/joggingappskotlin.appspot.com/o/histories_map_pictures%2FV90ljMv9NyY0YPW0KYSkSgRa0Z63%2F1652869580000.jpeg?alt=media&token=46d56b16-65d4-413d-a4e5-a642f15f8fee";
        var chiper = "";
        var hasilEnkrip = "";
        var p = BigInteger(ek.pnum);
        var g = BigInteger(ek.smallprim);
        var x = BigInteger(ek.privatkey);
        var pesanenkrip = [];
        var pesandekrip = [];
        var isichiper = [];
        var arrychr = [];
        var arrynum = [];

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
                console.log("Kunci Public : " + p + "," + g + "," + y);
                console.log("Kunci Public : " + Base64.encode(p.toString()) + "," + Base64.encode(g.toString()) + "," + Base64.encode(y.toString()));
                console.log("Kunci Private : " + Base64.encode(x.toString()) + "\n");
                console.log("Kunci Private : " + x + "\n");
               console.log("Pesan Awal : " + pesan);
                //console.log("Panjang pesan : " + Buffer.from(pesan).length);
                              //konversi char ke ASCII
                                var chr = converter.getCharASCII(pesan);
                                //membuat nilai random
                                var rn = number.getBilanganAcak(pesan, p);
                             // console.log("Pesan\tASCII\tNilai Random");
                              for (var i = 0; i < pesan.length; i++) {
                                  var c = pesan.charAt(i);
                               console.log(c + "\t" + chr.get(i).toString()
                                          + "\t" + rn.get(i));
                              }
              
                              //Proses Enkripsi
                              console.log("\n+++++ENKRIPSI+++++");
                              for (var i = 0; i < pesan.length; i++) {
                                  chiper = ed.getEnkripsi(chr.get(i).toString(),
                                          rn.get(i).toString(), g, p, y, pesan);
                                  hasilEnkrip += chiper;
                              }
                              console.log("Chiper : " + Base64.encode(hasilEnkrip.toString()));
                             console.log("Panjang pesan: " + ("MTkxIDk4MiA1NDcgMTc1NiAyMTYgMjA1NSA4MzMgMjQ5MCAzNiAyNjQ5IDU0NyAyMzE1IDgxNSAyNDYxIA==").length);
                              console.log("Panjang chiyper: " + Base64.encode(hasilEnkrip.toString()).length);
                              //console.log("Isi chiper: " + chiper);
               
                              //Proses Dekripsi
                              console.log("\n+++++DEKRIPSI+++++"); 
              
                              var chiperpecah = pct.setChiper(hasilEnkrip);
 
                              var ngama = chiperpecah[0];
                              var ndelta = chiperpecah[1];
                              //console.log("Isi chiper: " + chiper);
                              //Mengambil nilai gamma dan delta
                              //console.log("Gamma\tDelta");
                              //for (var i = 0; i < pesan.length; i++) {
                                //  console.log(ngama.get(i) + "\t" + ndelta.get(i));
                              //}
                              //--------------------------------------------------------------
                              //console.log(ngama);
                              //console.log(ndelta);
                              var hasilDekrip = "";
                              for (var i = 0; i < pesan.length; i++) {
                                 var dek = ed.getDekripsi(ngama[i].toString(),
                                          ndelta[i].toString(), p, x, chiper);
                                  hasilDekrip += dek;
                              }
                              console.log("Isi chiper: " + typeof chiper);
                              console.log("\nPesan : " + hasilDekrip);
                              //var durenkrip = "OTc5IDY0OCAxMjYgMjc4MyAyNzkzIDc3NyAxOTg3IDEzNTMgMTcyNCA2NyAyNTc0IDI4NzcgMzM2IDIyNzcgNDggMjU0OCA=";
                              //console.log(Base64.decode(durenkrip.toString()));
               
                              //Akhir dari proses Dekripsi
              
                //==============================================================
             }
         }
    }
}
Main.main([]);
