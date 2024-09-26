import CryptoJS from "crypto-js";

export function submitPay() {
   document.querySelector("#submit").click();
}

export default function FonepayPaymentPage({ total }) {
   const MD = "P";
   const AMT = total;
   const CRN = "NPR";
   const DT = new Date().toLocaleDateString("en-US");
   const R1 = "test";
   const R2 = "test";
   const RU = `${process.env.REACT_APP_URL}/login`; // fully valid verification page link
   const PRN = "fonepay-" + Date.now();
   const PID = "fonepay123";
   const sharedSecretKey = "fonepay";

   // Calculate DV using hash_hmac equivalent in JavaScript
   const message = `${PID},${MD},${PRN},${AMT},${CRN},${DT},${R1},${R2},${RU}`;
   // const DV = crypto
   //    .createHmac("sha512", sharedSecretKey)
   //    .update(message)
   //    .digest("hex");

   const DV = CryptoJS.HmacSHA512(message, sharedSecretKey).toString(
      CryptoJS.enc.Hex
   );

   const paymentDevUrl =
      "https://dev-clientapi.fonepay.com/api/merchantRequest";

   return (
      <form method="GET" id="payment-form" action={paymentDevUrl}>
         <input type="hidden" name="PID" value={PID} />
         <input type="hidden" name="MD" value={MD} />
         <input type="hidden" name="AMT" value={AMT} />
         <input type="hidden" name="CRN" value={CRN} />
         <input type="hidden" name="DT" value={DT} />
         <input type="hidden" name="R1" value={R1} />
         <input type="hidden" name="R2" value={R2} />
         <input type="hidden" name="DV" value={DV} />
         <input type="hidden" name="RU" value={RU} />
         <input type="hidden" name="PRN" value={PRN} />
         <input hidden="true" type="submit" id="submit" value="Click to Pay" />
      </form>
   );
}
