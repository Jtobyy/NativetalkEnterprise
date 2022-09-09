
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






// console.log(res)
                        

                        // Keep id from the response, will be called last_id, this item becomes important when a user wants to 
                        // ask for another otp, this id is a body parameter passed to the api.
                        window.sessionStorage.setItem('last_id', res.data.data.id)

                        // Keep track of last_id from the response, will be called last_last_id, 
                        // for future references, nothing in particular.
                        window.sessionStorage.setItem('last_last_id', res.data.data.last_id)

                        // Sends an email to the user containing their otp, backend automatically does this, but
                        // response time is slow.
                        // emailjs.send('service_ad3yf0k', 'template_b1uxsif', {
                        //     'to_name': window.sessionStorage.getItem('first_name'),
                        //     'reply_to': window.sessionStorage.getItem('email'),
                        //     'otp': res.data.data.otp
                        // }, 'rmJsklIWliSqgNSbG')

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

                axios.post('https://nativetalk-api-proxy.herokuapp.com/api/signup/', {
                    "number": window.sessionStorage.getItem('number'),
                    "reseller_id": window.sessionStorage.getItem('reseller_id'),
                    "telephone": window.sessionStorage.getItem('telephone'),
                    "password": window.sessionStorage.getItem('password'),
                    "email": window.sessionStorage.getItem('email'),
                    "first_name": window.sessionStorage.getItem('first_name'),
                    "last_name": window.sessionStorage.getItem('last_name'),
                    "country_id": window.sessionStorage.getItem('country_id'),
                    "company_name": window.sessionStorage.getItem('company_name'),
                    "currency_id": window.sessionStorage.getItem('currency_id'),
        })
        .then(res => {
            // Keep last_id from the response, this item becomes important when a user wants to 
            // ask for another otp, this last_id is a body parameter passed to the api.
            window.sessionStorage.setItem('last_id', res.data.data.id)

            // Keep track of reseller_id, for future references, nothing in particular                    
            window.sessionStorage.setItem('last_last_id', res.data.data.last_id)    
            console.log(res.data)    
        })
        .catch(err => {
            console.log(err.response)
            alert('Please try again with another email address, If error persist, choose a different number.')
        })

        axios.post('https://nativetalk-api-proxy.herokuapp.com/api/signup/', {
            "number": window.sessionStorage.getItem('number'),
            "reseller_id": window.sessionStorage.getItem('reseller_id'),
            "telephone": window.sessionStorage.getItem('telephone'),
            "password": window.sessionStorage.getItem('password'),
            "email": window.sessionStorage.getItem('email'),
            "first_name": window.sessionStorage.getItem('first_name'),
            "last_name": window.sessionStorage.getItem('last_name'),
            "country_id": window.sessionStorage.getItem('country_id'),
            "company_name": window.sessionStorage.getItem('company_name'),
            "currency_id": window.sessionStorage.getItem('currency_id'),
    })        