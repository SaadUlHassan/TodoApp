import React, { useState, useEffect } from "react";
const WebAuthn = () => {
  const [cId, setCId] = useState('17010de25823cd07f18e6b15ceb3a22a361923ea24b130439d4cdcd36b2c3d58caec4f01cecb0dfbb9af9942656ce771aa44f2cbc5373af2a561726e0995e87b31c6dfb32c858b23c8dcaa4')
//   const rpID = "localhost";
//   let expectedOrigin = "";
//   const loggedInUserId = "internalUserId";

//   const inMemoryUserDeviceDB = {
//     [loggedInUserId]: {
//       id: loggedInUserId,
//       username: `user@${rpID}`,
//       devices: [],
//       currentChallenge: undefined,
//     },
//   };

//   const generateRegistrationOptions = async () => {
//     const user = inMemoryUserDeviceDB[loggedInUserId];

//     const {
//       /**
//        * The username can be a human-readable name, email, etc... as it is intended only for display.
//        */
//       username,
//       devices,
//     } = user;

//     const opts = {
//       rpName: "SimpleWebAuthn Example",
//       rpID,
//       userID: loggedInUserId,
//       userName: username,
//       timeout: 60000,
//       attestationType: "none",
//       excludeCredentials: devices.map((dev) => ({
//         id: dev.credentialID,
//         type: "public-key",
//         transports: dev.transports,
//       })),
//       authenticatorSelection: {
//         userVerification: "required",
//         requireResidentKey: false,
//       },
//       supportedAlgorithmIDs: [-7, -257],
//     };

//     const options = generateRegistrationOptions(opts);

//     inMemoryUserDeviceDB[loggedInUserId].currentChallenge = options.challenge;
//   };

//   const verifyRegistration = async (body) => {
//     const user = inMemoryUserDeviceDB[loggedInUserId];

//     const expectedChallenge = user.currentChallenge;
  
//     let verification;
//     try {
//       const opts = {
//         credential: body,
//         expectedChallenge: `${expectedChallenge}`,
//         expectedOrigin,
//         expectedRPID: rpID,
//         requireUserVerification: true,
//       };
//       verification = await verifyRegistrationResponse(opts);
//     } catch (error) {
//       const _error = error;
//       console.error(_error);
//       return { error: _error.message };
//     }
  
//     const { verified, registrationInfo } = verification;
  
//     if (verified && registrationInfo) {
//       const { credentialPublicKey, credentialID, counter } = registrationInfo;
  
//       const existingDevice = user.devices.find(device => device.credentialID === credentialID);
  
//       if (!existingDevice) {
//         /**
//          * Add the returned device to the user's list of devices
//          */
//         const newDevice = {
//           credentialPublicKey,
//           credentialID,
//           counter,
//           transports: body.transports,
//         };
//         user.devices.push(newDevice);
//       }
//     }
//   }


//   const handleRegister = async () => {
//     const resp = await generateRegistrationOptions();

//     let attResp;
//     try {
//       const opts = await resp.json();
//       console.log('opts reg:', opts)
//       attResp = await startRegistration(opts);
//     } catch (error) {
//     //   if (error.name === 'InvalidStateError') {
//     //     elemError.innerText = 'Error: Authenticator was probably already registered by user';
//     //   } else {
//     //     elemError.innerText = error;
//     //   }

//       throw error;
//     }

//     const verificationResp = await verifyRegistration(JSON.stringify(attResp));

//     const verificationJSON = await verificationResp.json();
//     console.log('verificationJSON reg:', verificationJSON)
//     // if (verificationJSON && verificationJSON.verified) {
//     //   elemSuccess.innerHTML = `Authenticator registered!`;
//     //   elemSuccess.innerHTML = `Authenticator registered!`;
//     // } else {
//     //   elemError.innerHTML = `Oh no, something went wrong! Response: <pre>${JSON.stringify(
//     //     verificationJSON,
//     //   )}</pre>`;
//     // }
//   }
useEffect(() => {
  const script = document.createElement('script');
  script.src = "'../../js/cbor'";
  script.async = true;
  document.body.appendChild(script);
return () => {
    document.body.removeChild(script);
  }
}, []);
  async function webauthnCheck() {
    const challengeBuffer = Uint8Array.from("XXXXXX", c => c.charCodeAt(0)) //save
            const options = {
                publicKey: {
                    rp: { name: "localhost" },
                    user: {
                        name: "me.sohail31@gmail.com",
                        id: Uint8Array.from(String("345"), c => c.charCodeAt(0)),
                        displayName: "Sohail"
                    },
                    pubKeyCredParams: [{ type: "public-key", alg: -7 }],
                    challenge: challengeBuffer,
                    authenticatorSelection: {
                        authenticatorAttachment: "platform"
                    },
                    attestation: "direct"
                }
            }
            console.log('options:', options)
            const credential = await navigator.credentials.create(options);
            console.log('publicKeyCredential credential:', credential)

            const utf8Decoder = new TextDecoder('utf-8');
            const decodedClientData = utf8Decoder.decode(
                credential.response.clientDataJSON)

            // parse the string as an object
            const clientDataObj = JSON.parse(decodedClientData);

            console.log(clientDataObj)

            const decodedAttestationObject = 1 
            // CBOR.decode(redential.response.attestationObject);
          
            console.log(decodedAttestationObject);

            const {authData} = decodedAttestationObject;

            // get the length of the credential ID
            const dataView = new DataView(
                new ArrayBuffer(2));
            const idLenBytes = authData.slice(53, 55);
            idLenBytes.forEach(
                (value, index) => dataView.setUint8(
                    index, value));
            const credentialIdLength = dataView.getUint16();
            
            // get the credential ID
            const credentialId = authData.slice(
                55, 55 + credentialIdLength);
                setCId('17010de25823cd07f18e6b15ceb3a22a361923ea24b130439d4cdcd36b2c3d58caec4f01cecb0dfbb9af9942656ce771aa44f2cbc5373af2a561726e0995e87b31c6dfb32c858b23c8dcaa4')
            // get the public key object
            const publicKeyBytes = authData.slice(
                55 + credentialIdLength);
            
            // the publicKeyBytes are encoded again as CBOR
            // const publicKeyObject = CBOR.decode(
            //     publicKeyBytes.buffer);
            // console.log(publicKeyObject)
}

async function login() {
//  if (window.PasswordCredential) {
//    navigator.credentials.get({
//      password: true,
//      mediation: 'optional'
//    }).then(c => {
//      if (c) {
//        console.log('c:', c)
//      } else {
//        return Promise.resolve();
//      }
//    }).then(profile => {
//      if (profile) {
//        console.log('profile:', profile)
//      } else {
//        console.log('location.href = siosaoi')
//      }
//    }).catch(error => {
//      console.log('error:', error)
//    });
//  }
try {
var credentialId = new Uint8Array([183, 148, 245 /* more random bytes previously generated by the authenticator */]);
var options = {
  // The challenge is produced by t
  // rp: { name: "localhost" },
  challenge: new Uint8Array([4,101,15 /* 29 more random bytes generated by the server */]),
  timeout: 120000,  // 2 minutes
  allowCredentials: [{ type: "public-key", id: Uint8Array.from(
    cId, c => c.charCodeAt(0)), transports: ["internal"] }],
  authenticatorSelection: {
    authenticatorAttachment: "platform",
  },
  // userVerification: 'required',
  // attestation: 'direct',
};

console.log('options:', options)
const assertion = await navigator.credentials.get({
  publicKey: options
});
console.log('assertion:', assertion)

// const storedCredential = await getCredentialFromDatabase(
//   userHandle, credentialId);

// const signedData = (
//   authenticatorDataBytes +
//   hashedClientDataJSON);

// const signatureIsValid = storedCredential.publicKey.verify(
//   signature, signedData);

// if (signatureIsValid) {
//   return "Hooray! User is authenticated! 🎉";
// } else {
//   return "Verification failed. 😭"
// }

// let opt = {
//   rp: { name: "localhost" },
//   user: {
//       name: "me.sohail31@gmail.com",
//       id: Uint8Array.from(String("345"), c => c.charCodeAt(0)),
//       displayName: "Sohail"
//   },
//   pubKeyCredParams: [{ type: "public-key", alg: -7 }],
//   challenge: credentialId,
//   authenticatorSelection: {
//       authenticatorAttachment: "platform"
//   },
// }
// navigator.credentials.get({ "publicKey": options })
//     .then(function (assertion) {
//     console.log('assertion:', assertion)
//     // Send assertion to server for verification
// }).catch(function (err) {
//     console.log('err:', err)
//     // No acceptable credential or user refused consent. Handle appropriately.
// });
} catch (error) {
  console.log('error:', error)
}
}


  return (
    <div className="add-todo">
      <button onClick={webauthnCheck}>Register</button>
      <button onClick={login}>Login</button>
    </div>
  );
};

export default WebAuthn;
