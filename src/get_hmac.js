import { createHmac } from "crypto";

// The shared secret should be an extremely complex string, 
// in order to avoid brute force attacks
const sharedSecret = 'I\'m a very hard random string';

function getHmac(body) {
	// The object is converted to a string because the update method 
	// only accepts string, Buffer, TypedArray or DataView as types.
	const message = JSON.stringify(body);
	
	// The crypto module provides cryptographic functionality that includes
	// a set of wrappers for OpenSSL's hash, HMAC, cipher, decipher, sign, 
	// and verify functions.
	// 
	// crypto.createHmac(algorithm, key[, options]): this method creates the HMAC.
	// In our example, we use the algorithm SHA256 that will combine the shared
	// secret with the input message and will return a hash digested as a base64 
	// string.
	const hmac = createHmac('SHA256', sharedSecret)
	  .update(message, 'utf-8')
	  .digest('base64');
	
	return hmac;
}

const body = {
	name: 'foo',
	age: 24
};
const hmac = getHmac(body);
console.log(`HMAC generated: ${hmac}`);