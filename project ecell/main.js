
new Vue({
    el: '#otpForm',
    methods: {
        submitForm() {
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const otp = document.getElementById('otp').value;

            const formData = { firstName, lastName, email, otp };

            fetch('http://localhost:3000/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to verify OTP. Please try again.');
            });
        }
    }
});
