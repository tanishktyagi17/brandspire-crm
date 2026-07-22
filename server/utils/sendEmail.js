const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOtpEmail = async (email, otp) => {
  const mailOptions = {
    from: `"Brandspire CRM" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your Brandspire CRM Verification Code",
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden;">
        
        <div style="background:#0f172a;padding:20px;text-align:center;">
          <h1 style="color:#ffffff;margin:0;">Brandspire CRM</h1>
        </div>

        <div style="padding:30px;">

          <h2 style="color:#111827;">Verify Your Email</h2>

          <p style="font-size:16px;color:#374151;">
            Thank you for registering with <strong>Brandspire CRM</strong>.
          </p>

          <p style="font-size:16px;color:#374151;">
            Please use the verification code below to complete your registration.
          </p>

          <div style="margin:30px 0;text-align:center;">
            <span style="
              display:inline-block;
              background:#2563eb;
              color:white;
              padding:16px 40px;
              font-size:30px;
              font-weight:bold;
              border-radius:8px;
              letter-spacing:8px;
            ">
              ${otp}
            </span>
          </div>

          <p style="color:#dc2626;font-weight:bold;">
            This OTP will expire in 5 minutes.
          </p>

          <p style="color:#6b7280;">
            If you did not request this verification, you can safely ignore this email.
          </p>

          <hr style="margin:30px 0;">

          <p style="font-size:13px;color:#9ca3af;text-align:center;">
            © ${new Date().getFullYear()} Brandspire CRM. All rights reserved.
          </p>

        </div>

      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendOtpEmail;