const { sec } = require("mathjs");

//randomprime
const getPrimes = (min, max) => {
    const result = Array(max + 1)
    .fill(0)
    .map((_, i) => i);
    for (let i = 2; i <= Math.sqrt(max + 1); i++) {
       for (let j = i ** 2; j < max + 1; j += i) delete result[j];
    }
    return Object.values(result.slice(min));
 };
 const getRandomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
 };
 const getRandomPrime = ([min, max]) => {
    const primes = getPrimes(min, max);
    return primes[getRandomNum(0, primes.length - 1)];
 };

 //var pnum = getRandomPrime([260,2500]);

do{
     pnum = getRandomPrime([260,2500]);
 }
 while (pnum % 4 != 3);

//primitive root
/* Iterative Function to calculate (x^n)%p in
O(logy) */
function power(x, y, p) {
	let res = 1;	 // Initialize result

	x = x % p; // Update x if it is more than or
	// equal to p

	while (y > 0) {
		// If y is odd, multiply x with result
		if (y & 1)
			res = (res * x) % p;

		// y must be even now
		y = y >> 1; // y = y/2
		x = (x * x) % p;
	}
	return res;
}

// Utility function to store prime factors of a number
function findPrimefactors(s, pnum) {
	// Print the number of 2s that divide n
	while (pnum % 2 == 0) {
		s.add(2);
		pnum = pnum / 2;
	}

	// pnum must be odd at this point. So we can skip
	// one element (Note i = i +2)
	for (let i = 3; i <= Math.sqrt(pnum); i = i + 2) {
		// While i divides n, print i and divide n
		while (pnum % i == 0) {
			s.add(i);
			pnum = pnum / i;
		}
	}

	// This condition is to handle the case when
	// n is a prime number greater than 2
	if (pnum > 2)
		s.add(pnum);
}

// Function to find smallest primitive root of n
function findPrimitive(pnum) {
	let s = new Set();

	// Check if n is prime or not
	if (pnum == false)
		return -1;

	// Find value of Euler Totient function of n
	// Since n is a prime number, the value of Euler
	// Totient function is n-1 as there are n-1
	// relatively prime numbers.
	let phi = pnum - 1;

	// Find prime factors of phi and store in a set
	findPrimefactors(s, phi);

	// Check for every number from 2 to phi
	for (let r = 2; r <= phi; r++) {
		// Iterate through all prime factors of phi.
		// and check if we found a power with value 1
		let flag = false;
		for (let it of s) {

			// Check if r^((phi)/primefactors) mod n
			// is 1 or not
			if (power(r, phi / it, pnum) == 1) {
				flag = true;
				break;
			}
		}

		// If there was no power with value 1.
		if (flag == false)
			return r;
	}

	// If no primitive root found
	return -1;
}
smallprim = findPrimitive(pnum)

// Kunci Rahasia
function getRndInteger(min, max, pnum) {
	randnum = Math.floor(Math.random() * (max - min) ) + min;
    if (1 < randnum < pnum-2){
		return randnum;
	}
	else{
	do{
	Math.floor(Math.random() * (max - min) ) + min;
	} while (1 < randnum < pnum-2);
	return randnum
	}
}
privatkey = getRndInteger(100, 1000, pnum);

module.exports = {
	pnum,
	smallprim,
	privatkey
}
