// 1. Add a 'hasPaid' state at the top of your component
const [hasPaid, setHasPaid] = useState(false);

// 2. Update the handleSave function
const handleSave = async () => {
  if (!hasPaid) {
    // If they haven't paid, trigger the Lemon Squeezy Checkout
    const checkoutUrl = await getCheckoutURL(userId, userEmail); // Using the action from Step 6
    window.location.href = checkoutUrl;
    return;
  }

  // If they have paid, proceed with the save logic from Step 7
  await savePortfolio(portfolioData, username);
  alert("Published!");
};