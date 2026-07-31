import { Resend } from "resend";

let resend: Resend;

function getResend() {
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendVerificationEmail(email: string, code: string) {
  const { data, error } = await getResend().emails.send({
    from: "Blog Comments <onboarding@resend.dev>",
    to: email,
    subject: "Verify your comment",
    html: `
      <div style="font-family: Georgia, serif; max-width: 480px; margin: 0 auto; padding: 32px;">
        <h2 style="margin-bottom: 16px;">Verify your comment</h2>
        <p style="color: #555; margin-bottom: 24px;">
          Enter this code on the blog post to publish your comment:
        </p>
        <div style="background: #f4f4f5; border-radius: 8px; padding: 20px; text-align: center; margin-bottom: 24px;">
          <span style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #18181b;">
            ${code}
          </span>
        </div>
        <p style="color: #888; font-size: 14px;">
          This code expires in 10 minutes. If you didn't leave a comment, you can ignore this email.
        </p>
      </div>
    `,
  });

  if (error) {
    throw new Error(`Failed to send verification email: ${error.message}`);
  }

  return data;
}

export async function sendContactEmail(
  name: string,
  email: string,
  message: string
) {
  const { data, error } = await getResend().emails.send({
    from: "Portfolio Contact Form <onboarding@resend.dev>",
    to: "emiliorivera747@gmail.com",
    replyTo: email,
    subject: `New message from ${escapeHtml(name)}`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 480px; margin: 0 auto; padding: 32px;">
        <h2 style="margin-bottom: 16px;">New contact form message</h2>
        <p style="color: #555; margin-bottom: 8px;"><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p style="color: #555; margin-bottom: 24px;"><strong>Email:</strong> ${escapeHtml(email)}</p>
        <div style="background: #f4f4f5; border-radius: 8px; padding: 20px; white-space: pre-wrap; color: #18181b;">
          ${escapeHtml(message)}
        </div>
      </div>
    `,
  });

  if (error) {
    throw new Error(`Failed to send contact email: ${error.message}`);
  }

  return data;
}
