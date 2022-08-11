
<Card.Title as='h1' className='fw-800 fs-3em'>Free</Card.Title>                            
$.ajax({
    url: 'https://dashboard.nativetalk.com.ng/api/dids/',    
    method: 'POST',
    headers: {
         'x-auth-token': 'mzFxYakJRhZ8e6nEqMnhvLBVsVpFVj',
         'Content-Type': 'application/json',
    },
    body: {
        id:"0",
        token:"",
        action:"list",
        limit:"5",
        accountid:"0"
    }
})
.done((res) => {
    alert(res)
    return (res)
})
<script src="https://smtpjs.com/v3/smtp.js"></script>
const Email = window.Email
                Email.send({
                    Host : "mail.nativetalk.io",
                    Username : "info@nativetalk.io",
                    Password : "nativetalk123@",
                    To : sessionStorage.getItem('email'),
                    From : "info@nativetalk.io",
                    Subject : "Almost there",
                    Body : "Please click the link below to verify your account<a href='127:0.0.1:3000/VerifyOtp'>Verify</a>"
                })
                .then(
                    message => alert(message)
                );