/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
// import { ANGIE_EMAIL } from "@/lib/constants";
import fs from "fs";
import path from "path";

// Create transporter
const transporter = nodemailer.createTransport({
  port: 465, // Use 587 for STARTTLS, 465 for SSL
  secure: true,
  host: process.env.SUPPORT_EMAIL_HOST,
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your app password
  },
});

// Function to read and process email template
function getEmailTemplate(templateName: string, data: any): string {
  try {
    const templatePath = path.join(
      process.cwd(),
      "src",
      "email-templates",
      `${templateName}.html`
    );
    let template = fs.readFileSync(templatePath, "utf8");

    // Replace placeholders with actual data
    Object.keys(data).forEach((key) => {
      const placeholder = `{{${key}}}`;
      const value = data[key] || "";
      template = template.replace(new RegExp(placeholder, "g"), value);
    });

    return template;
  } catch (error) {
    console.error("Error reading email template:", error);
    // Fallback to simple HTML
    return `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone || "Not provided"}</p>
      <p><strong>Message:</strong> ${data.message}</p>
      <p><strong>Date:</strong> ${data.date}</p>
    `;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      message,
      subject,
      template = "contact",
      propertyInfo,
    } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Prepare email data
    const emailData = {
      name,
      email,
      phone: phone || "Not provided",
      message,
      date: new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      brand: "Whitewall Realty",
      logo_url:
        "https://kaya-storage.fra1.cdn.digitaloceanspaces.com/properties/wh_logo.webp", // Replace with your actual logo URL
      ...propertyInfo, // Include any property information if provided
    };

    // Get HTML template
    const htmlContent = getEmailTemplate(template, emailData);

    // Create plain text version
    const textContent = `
New Contact Form Submission

Contact Details:
- Name: ${name}
- Email: ${email}
- Phone: ${phone || "Not provided"}
- Date: ${emailData.date}

Message:
${message}

${
  propertyInfo
    ? `
Property Information:
- Property: ${propertyInfo.title || "N/A"}
- Location: ${propertyInfo.location || "N/A"}
- Price: ₦${propertyInfo.price?.toLocaleString() || "N/A"} ${
        propertyInfo.priceType || ""
      }
`
    : ""
}

Sent from Whitewall Realty website contact form.
    `;

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "jdon144@gmail.com", //TODO: Replace with AMGIE_EMAIL
      subject: subject || `Contact Form: New Message from ${name}`,
      text: textContent,
      html: htmlContent,
      replyTo: email, // This allows Angie to reply directly to the sender
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json(
      {
        success: true,
        messageId: info.messageId,
        message: "Email sent successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      {
        error: "Failed to send email",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
