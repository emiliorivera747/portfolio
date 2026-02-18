import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, code: string) {
  const { data, error } = await resend.emails.send({
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
