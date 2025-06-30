# Email Setup Guide

This guide will help you set up the email functionality for the Whitewall Realty website.

## Prerequisites

1. A Gmail account (or other email service)
2. 2-Step Verification enabled on your Google Account

## Setup Instructions

### 1. Create Environment Variables

Create a `.env.local` file in your project root and add the following:

```env
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### 2. Generate Gmail App Password

If using Gmail, you need to generate an App Password:

1. Go to your [Google Account settings](https://myaccount.google.com/)
2. Navigate to **Security**
3. Enable **2-Step Verification** if not already enabled
4. Go to **App passwords** (under 2-Step Verification)
5. Select **Mail** as the app and **Other** as the device
6. Click **Generate**
7. Copy the 16-character password and use it as your `EMAIL_PASS`

### 3. Alternative Email Services

You can use other email services by modifying the transporter configuration in `src/app/api/send-email/route.ts`:

#### For Outlook/Hotmail:
```javascript
const transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
```

#### For Custom SMTP:
```javascript
const transporter = nodemailer.createTransport({
  host: 'your-smtp-host.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
```

## Email Templates

The system uses HTML email templates located in `src/email-templates/`:

- `contact.html` - Main contact form template
- You can create additional templates for different use cases

### Template Placeholders

Available placeholders for email templates:
- `{{name}}` - Contact person's name
- `{{email}}` - Contact person's email
- `{{phone}}` - Contact person's phone
- `{{message}}` - Contact message
- `{{date}}` - Submission date/time
- `{{brand}}` - Brand name (Whitewall Realty)
- `{{logo_url}}` - Logo URL (update in API route)

## Testing

1. Start your development server: `npm run dev`
2. Fill out any contact form on the website
3. Submit the form
4. Check your email inbox for the formatted email

## Troubleshooting

### Common Issues

1. **Authentication failed**: Make sure you're using an App Password, not your regular password
2. **Email not sending**: Check your environment variables are correctly set
3. **Template not loading**: Ensure the template file exists in `src/email-templates/`

### Debug Mode

To see detailed error messages, check your browser's developer console and server logs.

## Security Notes

- Never commit your `.env.local` file to version control
- Use App Passwords instead of regular passwords
- Consider using environment-specific email accounts for production 