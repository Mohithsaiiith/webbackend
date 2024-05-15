const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const randomize = require('randomatic');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io', // Replace with your SMTP host
    port: 2525, // Replace with your SMTP port
    auth: {
        user: 'your_smtp_username', // Replace with your SMTP username
        pass: 'your_smtp_password' // Replace with your SMTP password
    }
});

// Generate OTP function
function generateOTP() {
    return randomize('0', 6); // Generates a 6-digit numeric OTP
}

// Route to send OTP via email and verify OTP
app.post('/verify-otp', (req, res) => {
    const { firstName, lastName, email, otp } = req.body;

    // Generate OTP
    const generatedOTP = generateOTP();

    // Email content
    const mailOptions = {
        from: 'sender@example.com',
        to: email,
        subject: 'OTP Verification',
        text: `Hello ${firstName} ${lastName},\n\nYour OTP for email verification is: ${generatedOTP}`
    };

    // Send email with OTP
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending OTP email:', error);
            return res.status(500).json({ message: 'Failed to send OTP. Please try again.' });
        }
        console.log('OTP email sent:', info.response);

        // Verify OTP
        if (otp === generatedOTP) {
            return res.status(200).json({ message: 'OTP verified successfully. Account is verified!' });
        } else {
            return res.status(400).json({ message: 'Incorrect OTP. Please try again.' });
        }
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
