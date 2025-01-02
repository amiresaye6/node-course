const nodeMailer = require("nodemailer");

const transporter = nodeMailer.createTransport({
    service: 'Gmail', // Use Gmail or another free SMTP service
    auth: {
        user: process.env.NODE_MAIL_EMAI, // Your email
        pass: process.env.NODE_MAIL_EMAIL_PASSWORD, // Your email password or app-specific password
    },
});

const sendVerificationEmail = async (email, verificationLink) => {
    const mailOptions = {
        from: process.env.NODE_MAIL_EMAI,
        to: email,
        subject: 'Verify Your Email',
        text: `Click the link to verify your email: ${verificationLink}`,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendVerificationEmail;
