import React, { useEffect } from "react";
import Style from "../../public/assets/css/PaypalBtn.module.css";
import { toast } from "react-toastify";
export function PaypalBtn({ amount, checkout, endCheckout }) {
	useEffect(() => {
		paypal
			.Buttons({
				// Set up the transaction
				createOrder: function (data, actions) {
					return actions.order.create({
						purchase_units: [
							{
								amount: {
									value: amount,
								},
							},
						],
					});
				},

				// Finalize the transaction
				onApprove: function (data, actions) {
					return actions.order.capture().then(function (details) {
						// handle order with endPoint database
						checkout();
						// delete cart from db
						endCheckout();
						// Show a success message to the buyer
						toast.success(
							" 💵 Transaction completed by " +
								details.payer.name.given_name +
								"! "
						);
					});
				},
				onError: (error) => {
					toast.warn("error", error);
				},
			})
			.render("#paypal-button-container");
	}, []);
	return <div id="paypal-button-container" className={Style.paypalBtn}></div>;
}
