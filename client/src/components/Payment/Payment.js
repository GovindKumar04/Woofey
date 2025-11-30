
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

  // Fetch order from backend
  const result = await fetch("http://localhost:5000/api/create-order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount: 500 }), // amount in rupees
  });

  const data = await result.json();

  if (!data.id) {
    alert("Failed to create order. Please try again.");
    return;
  }

  const paymentData = {
    key: "YOUR_KEY_ID", // Razorpay public key
    amount: data.amount,
    currency: data.currency,
    name: "Woofey",
    description: "Food Delivery Payment",
    image: "https://example.com/logo.png",
    order_id: data.id, // Order ID from backend
    handler: (response) => {
      alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
      console.log("Payment Response:", response);
    },
    prefill: {
      name: "John Doe",
      email: "john.doe@example.com",
      contact: "9999999999",
    },
    notes: {
      address: "Customer's Address",
    },
    theme: {
      color: "#3399cc",
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
        Pay NoW
      </button>
    </div>
  );
};

export default Payment;

