import React, { useState } from "react";
import Fonepay from "../payment/Fonepay";
import { submitPay } from "../payment/Fonepay";

export default function Pricing() {
   const [total, setTotal] = useState(0);
   //handle submit
   const handleSubmit = (type) => {
      if (type === "free") {
         window.location.href = "/login";
         return;
      } else if (type === "deluxe") {
         setTotal(1500);
      } else if (type === "enterprise") {
         setTotal(2999);
      }
      submitPay();
   };

   return (
      <div className="">
         <Fonepay total={total} />
         <div class="row row-cols-1 row-cols-md-3 mb-3 text-center w-2/4  absolute top-1/4 left-1/4 ">
            <div class="col">
               <div class="card mb-4 rounded-3 shadow-sm">
                  <div class="card-header py-3">
                     <h4 class="my-0 fw-normal">Free</h4>
                  </div>
                  <div class="card-body">
                     <h1 class="card-title pricing-card-title">
                        RS. 0<small class="text-muted fw-light"></small>
                     </h1>
                     <ul class="list-unstyled mt-3 mb-4">
                        <li>Watch trailers</li>
                        <li>all movie details</li>
                        <li>latest movies</li>
                        <li>latest tv shows</li>
                     </ul>
                     <button
                        type="button"
                        class="w-100 btn btn-lg btn-outline-primary"
                        onClick={() => {
                           handleSubmit("free");
                        }}
                     >
                        Sign up for free
                     </button>
                  </div>
               </div>
            </div>
            <div class="col">
               <div class="card mb-4 rounded-3 shadow-sm">
                  <div class="card-header py-3">
                     <h4 class="my-0 fw-normal">Deluxe</h4>
                  </div>
                  <div class="card-body">
                     <h1 class="card-title pricing-card-title">
                        Rs. 1500<small class="text-muted fw-light"></small>
                     </h1>
                     <ul class="list-unstyled mt-3 mb-4">
                        <li>Watch movies</li>
                        <li>all movie details</li>
                        <li>latest movies</li>
                        <li>latest tv shows</li>
                     </ul>
                     <button
                        type="button"
                        class="w-100 btn btn-lg btn-primary"
                        onClick={() => {
                           handleSubmit("deluxe");
                        }}
                     >
                        fone pay
                     </button>
                  </div>
               </div>
            </div>
            <div class="col">
               <div class="card mb-4 rounded-3 shadow-sm border-primary">
                  <div class="card-header py-3 text-white bg-primary border-primary">
                     <h4 class="my-0 fw-normal">HD</h4>
                  </div>
                  <div class="card-body">
                     <h1 class="card-title pricing-card-title">
                        Rs. 2999<small class="text-muted fw-light"></small>
                     </h1>
                     <ul class="list-unstyled mt-3 mb-4">
                        <li>Watch HD movies</li>
                        <li>all movie details</li>
                        <li>latest movies</li>
                        <li>latest tv shows</li>
                     </ul>
                     <button
                        type="button"
                        class="w-100 btn btn-lg btn-primary"
                        onClick={() => {
                           handleSubmit("hd");
                        }}
                     >
                        fone pay
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
