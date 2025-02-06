import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type CartItem = {
  name: string;
  price: number;
  quantity: number;
};

type EmailRequestBody = {
  email: string;
  name: string;
  cartItems: CartItem[];
  totalPrice: number;
};

export async function POST(request: Request) {
  try {
    console.log("Request received");
    const { email, name, cartItems, totalPrice }: EmailRequestBody =
      await request.json();
    console.log("Parsed request body:", { email, name, cartItems, totalPrice });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const itemsList = cartItems
      .map(
        (item) =>
          `<li>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</li>`
      )
      .join("");

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "✨ Thank You for your purchase! ✨",
      html: `
        <div style="font-family: 'Georgia', serif; color: #333; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e0e0e0; border-radius: 12px; background-color: #ffffff;">
          <!-- Header Section -->
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2c3e50; font-size: 32px; margin-bottom: 10px; font-weight: bold;">Thank You, 🎀${name}🎀!</h1>
            <p style="font-size: 18px; color: #555; line-height: 1.6;">
              We're delighted to have you as a valued customer. Your order has been successfully placed and is now being processed.
            </p>
          </div>

          <!-- Order Summary Section -->
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 12px; margin-bottom: 30px;">
            <h2 style="color: #2c3e50; font-size: 24px; margin-bottom: 15px; font-weight: bold;">📦 Order Summary</h2>
            <ul style="list-style-type: none; padding: 0; margin: 0;">
              ${itemsList}
            </ul>
            <p style="font-size: 20px; font-weight: bold; color: #2c3e50; margin-top: 15px;">
              💵 Total: $${totalPrice.toFixed(2)}
            </p>
          </div>

          <!-- Delivery Information Section -->
          <div style="margin-bottom: 30px;">
            <h2 style="color: #2c3e50; font-size: 24px; margin-bottom: 15px; font-weight: bold;">🚚 Delivery Information</h2>
            <p style="font-size: 18px; color: #555; line-height: 1.6;">
              Your order is being carefully prepared and will be shipped soon. You'll receive another email with tracking information once it's on its way.
            </p>
          </div>

          <!-- Contact Information Section -->
          <div style="margin-bottom: 30px;">
            <h2 style="color: #2c3e50; font-size: 24px; margin-bottom: 15px; font-weight: bold;">📞 Need Help?</h2>
            <p style="font-size: 18px; color: #555; line-height: 1.6;">
              If you have any questions or need assistance, feel free to contact us at 
              <a href="mailto:amrahaanwar@gmail.com" style="color: #4CAF50; text-decoration: none; font-weight: bold;">amrahaanwar@gmail.com</a> 
              or call us at <strong style="color: #2c3e50;">+92-3178575604</strong>.
            </p>
          </div>

          <!-- Footer Section -->
          <div style="text-align: center; margin-top: 30px;">
            <p style="font-size: 18px; color: #555; line-height: 1.6;">
              Thank you for choosing <strong style="color: #2c3e50;">Comforty Furniture Shop</strong>. We appreciate your trust in us and look forward to serving you again! ❤️
            </p>
            <p style="font-size: 14px; color: #777; margin-top: 15px;">
              This is an automated email. Please do not reply directly to this message.
            </p>
          </div>
        </div>
      `,
    };

    console.log("Attempting to send email...");
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);

    let errorMessage = "Failed to send email";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}