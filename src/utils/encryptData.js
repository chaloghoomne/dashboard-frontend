import CryptoJS from "crypto-js";

const encryptionKey = CryptoJS.SHA512(import.meta.env.VITE_ENCRYPTION_KEY)
  .toString(CryptoJS.enc.Hex)
  .substring(0, 32);

const encryptionIv = CryptoJS.SHA512(import.meta.env.VITE_ENCRYPTION_IV)
  .toString(CryptoJS.enc.Hex)
  .substring(0, 16);

const encryptData = (data) => {
  try {
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      CryptoJS.enc.Utf8.parse(encryptionKey),
      {
        iv: CryptoJS.enc.Utf8.parse(encryptionIv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );

    return encrypted.toString();
  } catch (error) {
    console.error("Encryption failed:", error);
    throw new Error("Encryption failed");
  }
};

export default encryptData;
