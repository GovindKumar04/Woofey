import React from "react";

const Payment = () => {
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      alert("Failed to load Razorpay SDK. Please check your internet connection.");
      return;
    }

    // Replace with your backend API to create an order and get payment details
    const paymentData = {
      amount: 500 * 100, // Amount in paise (₹5.00)
      currency: "INR",
      name: "Woofey",
      description: "Food Delivery Payment",
      image: "https://example.com/logo.png", // Replace with your logo
      order_id: "order_PNaOWoW6DGaO24", // Replace with order_id from backend
      prefill: {
        name: "John Doe", // Example pre-filled user data
        email: "john.doe@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Customer's Address",
      },
      theme: {
        color: "#3399cc",
      },
      handler: (response) => {
        alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
        console.log("Payment Response:", response);
      },
    };

    const razorpay = new window.Razorpay(paymentData);

    razorpay.on("payment.failed", (response) => {
      alert(`Payment Failed! Reason: ${response.error.reason}`);
      console.log("Payment Error:", response);
    });

    razorpay.open();
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Make a Payment</h1>
      <p>Pay ₹5.00 securely using Razorpay.</p>
      <button
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          color: "white",
          backgroundColor: "#3399cc",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={handlePayment}
      >
        Pay Now
      </button>
    </div>
  );
};

export default Payment;

