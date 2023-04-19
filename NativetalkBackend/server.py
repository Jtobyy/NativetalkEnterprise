import json
import logging
import smtplib, ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from string import Template

from flask import Flask, request, jsonify


app = Flask(__name__)

messages = {
    "new_signup_info": Template(
        """
Names: $first_name $last_name
Business Name: $business_name
Email Address: $customer_email
Work Address: $work_address
NIN Number: $nin_number
No of extensions: $extensions
DID Number Selected: $did_number
        """
    ),
    
    "user_verification_email": Template(
        """
Hello $customer_name,

Thank you for registering with NativeTalk, a member of the team is checking your account right now.

Once your account has been validated, you will receive an email within 48 hours.

Thank you
NativeTalk Team
        """
    ),

    "new_cyberfix_order": Template(
        """
        
        """
    )
}

@app.route("/flsk/")
def main():
    return "<h1 style='color:green'>You've reached nativetalk enterprise email server endpoint<h1>"

@app.route("/flsk/send-mail", methods=["POST"])
def send_email():
    data = json.loads(request.data.decode('utf-8'))
    
    smtp_server = "mail.nativetalk.io"
    port = 465
    password = "Nativetalk123@"
    sender_email = "info@nativetalk.io"

    try:
        receiver_email = data["to_email"]
        email_template = data["email_template"]

        message = MIMEMultipart("alternative")
        message["From"] = sender_email
        message["To"] = receiver_email
        
        if email_template == "new_signup_info":
            message["Subject"] = "Account Verification Notification!"
            
            text = messages["new_signup_info"].substitute(
                first_name = data["first_name"],
                last_name = data["last_name"],
                business_name = data["business_name"],
                customer_email = data["customer_email"],
                work_address = data["work_address"],
                nin_number = data["nin_number"],
                extensions = data["extensions"],
                did_number = data["did_number"]
            )

            part1 = MIMEText(text, "plain")
            message.attach(part1)

            # part2 = MIMEText(html, "html")
            # message.attach(part2)
        
        if email_template == "user_verification_email":
            message["Subject"] = "Account Verification"
            
            text = messages["user_verification_email"].substitute(
                customer_name = data["to_name"]
            )

            part1 = MIMEText(text, "plain")
            message.attach(part1)

            
        # Cybervilla
        if email_template == "new_cyberfix_order":
            messsage["Subject"] = ""
            # helloxs
            
    except KeyError as e:
        return jsonify({'error': {'message': "required field missing " + str(e)}}), 400
    
    context = ssl.create_default_context()

    print(message)
    
    if message != None:
        with smtplib.SMTP_SSL("mail.nativetalk.io", port, context=context) as server:
            server.login(sender_email, password)
            server.sendmail(sender_email, receiver_email, message.as_string())

            return jsonify({'success': "email sent successfully"}), 200


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True, port=5007)

if __name__ != '__main__':
    gunicorn_logger = logging.getLogger('gunicorn.error')
    app.logger.handlers = gunicorn_logger.handlers
    app.logger.setLevel(gunicorn_logger.level)
