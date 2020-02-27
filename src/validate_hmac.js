import { createHmac, timingSafeEqual } from "crypto";

const sharedSecret = 'I\'m a very hard random string';
const hmac = '<get the hmac generated with the getHmac method>';

function validateHmac(hmac, body) {
	const message = JSON.stringify(body);
	
	// Now we convert the hashes to Buffer because the timingSafeEqual needs them
	// as types Buffer, TypedArray or DataView
	const providedHmac = Buffer.from(hmac, 'utf-8');
	const generatedHash = Buffer.from(
	  createHmac('SHA256', sharedSecret).update(message).digest('base64'),
	  'utf-8',
	);
	
	// This method operates with secret data in a way that does not leak 
	// information about that data through how long it takes to perform 
	// the operation. 
	// You could compare the hashes as string, but you should compare timing in
	// order to make your code safer.
	if(!timingSafeEqual(generatedHash, providedHmac)) {
		// The message was changed, the HMAC is invalid or the timing isn't safe
		throw new Error('Invalid request');
	}
}

const body = {
	name: 'foo',
	age: 24
};

try {
	validateHmac(hmac, body);
	console.log('Valid HMAC');
} catch(error) {
	console.error(`Error: ${error}`);
}