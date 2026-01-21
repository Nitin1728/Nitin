'use server'
import { lemonSqueezySetup, createCheckout } from "@lemonsqueezy/lemonsqueezy.js";

// Initialize with your secret key
lemonSqueezySetup({ apiKey: process.env.LEMON_SQUEEZY_API_KEY });

export async function getCheckoutURL(userId: string, userEmail: string) {
  const storeId = "your_store_id"; // Found in LS Settings > Stores
  const variantId = "your_variant_id"; // Found in LS Products > Variants

  const checkout = await createCheckout(storeId, variantId, {
    checkoutData: {
      email: userEmail,
      custom: {
        user_id: userId, // Very important! Ties the payment to your Supabase user
      },
    },
    productOptions: {
      redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
    },
  });

  return checkout.data?.data.attributes.url;
}