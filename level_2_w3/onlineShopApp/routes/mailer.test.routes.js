const routere = require("express").Router();
const { sendEmail } = require("../middlewares/automaticMailer");

routere.post('/test-email', async (req, res) => {
    const { to, message } = req.body;

    if (!to || !message) {
        return res.status(400).json({ error: 'Please provide both "to" and "message" in the request body.' });
    }

    try {
        await sendEmail(to, 'Test Email', message);
        res.status(200).json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email.' });
    }
});

module.exports = routere;
