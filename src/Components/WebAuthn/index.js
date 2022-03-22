import React, { useState, useEffect } from "react";
import * as CBOR from "cbor-web";

const WebAuthn = () => {
  const [cId, setCId] = useState('')
  const [publicKeyId, setPublicKeyId] = useState('')
  function detectWebAuthnSupport() {
    if (window.PublicKeyCredential === undefined ||
        typeof window.PublicKeyCredential !== "function") {
        alert("Oh no! This browser doesn't currently support WebAuthn.")
        if (window.location.protocol === "http:" && (window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1")){
            alert("WebAuthn only supports secure connections. For testing over HTTP, you can use the origin \"localhost\".")
        }
        return;
    }
}

  async function webauthnCheck() {
    const publicKeyCredentialCreationOptions = {
      challenge: Uint8Array.from(
        "xxxxxxxxxxxxxx", c => c.charCodeAt(0)),
      rp: {
        name: "Duo Security",
        id: "localhost",
      },
      user: {
        id: Uint8Array.from(
          "UZSL85T9AFC", c => c.charCodeAt(0)),
        name: "lee@webauthn.guide",
        displayName: "Lee",
      },
      pubKeyCredParams: [{ alg: -7, type: "public-key" }],
      authenticatorSelection: {
        authenticatorAttachment: "platform",
      },
      timeout: 60000,
      attestation: "direct"
    };

    const credential = await navigator.credentials.create({
      publicKey: publicKeyCredentialCreationOptions
    });
    setPublicKeyId(credential.id)
    console.log("credential: ", credential);
    const decodedAttestationObj = CBOR.decode(
      credential.response.attestationObject);

    const { authData } = decodedAttestationObj;

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

    // get the public key object
    const publicKeyBytes = authData.slice(
      55 + credentialIdLength);

    // the publicKeyBytes are encoded again as CBOR
    const publicKeyObject = CBOR.decode(
      publicKeyBytes.buffer);
    console.log(publicKeyObject)
    setCId(credentialId);
  }

  async function login() {
    try {
      console.log(cId);
      const publicKeyCredentialRequestOptions = {
        challenge: Uint8Array.from(
          "xxxxxx", c => c.charCodeAt(0)),
        allowCredentials: [{
          id: cId,
          type: 'public-key',
          transports: ['internal'],
        }],
        timeout: 60000,
      }
      const assertion = await navigator.credentials.get({
        publicKey: publicKeyCredentialRequestOptions
      });
      console.log(assertion);

      if(assertion?.id === publicKeyId) {
        alert('Authenticated Successfully')
      }
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


// id: "AeMv38IZlvnlYhTIDq1AHhERDSr18afH6tmzxxK1ckpRGuI60H1_6PjKHLio0FZeV90yU4Xx-aRQbmr2c3VNLw";
// id: "Ac74TF-RO-3QNqZ52J4lqTJ_kB3jF2smmivWUkJzlLly2-LIVhlQonRKW3mRGBrXU4Yak4TRx8Elgp6uvJqV1A"
