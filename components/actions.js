"use server";

import { revalidatePath } from "next/cache";

const MAILER_LITE_API_KEY = process.env.MAILER_LITE_API_KEY;
// const MAILER_LITE_GROUP_ID = process.env.MAILER_LITE_GROUP_ID; // Optional: if you want to add subscribers to a specific group

export async function subscribeToNewsletter(formData) {
  const email = formData.get("email");

  if (!email) {
    return { success: false, message: "Email is required" };
  }

  try {
    const response = await fetch(
      "https://connect.mailerlite.com/api/subscribers",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${MAILER_LITE_API_KEY}`,
        },
        body: JSON.stringify({
          email: email,
          // groups: MAILER_LITE_GROUP_ID ? [MAILER_LITE_GROUP_ID] : undefined,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to subscribe");
    }

    revalidatePath("/"); // Revalidate the current page
    return { success: true, message: "Subscribed successfully" };
  } catch (error) {
    console.error("Subscription error:", error);
    return { success: false, message: error.message || "An error occurred" };
  }
}
