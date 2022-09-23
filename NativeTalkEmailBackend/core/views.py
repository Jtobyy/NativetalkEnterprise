from distutils import extension
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from string import Template
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import smtplib, ssl


port = 465
password = 'nativetalk123@'

def SendEmailView(request):
    """Sends email for the nativetalk's website"""
    if request.method == 'GET':
        sender_email = 'info@nativetalk.io'
        details = request.GET

        template = details.get('template')
        # print(template)
        if template == 'nativetalk_account_creation_verification_customer':
            to_email = details['to_email']
            to_name = details['to_name']

            message = MIMEMultipart('alternative')
            message['From'] = sender_email
            message['To'] = to_email
            message['Subject'] = "Account Verification"
            message_body = templates['nativetalk_account_creation_verification_customer'].substitute(to_name=to_name)
            full_message = MIMEText(message_body, 'plain')
            message.attach(full_message)

            context = ssl.create_default_context()
            with smtplib.SMTP_SSL('mail.nativetalk.io', port, context=context) as server:
                server.login(sender_email, password)
                server.sendmail(sender_email, to_email, message.as_string())
                print('sent')
            return JsonResponse({'email status': 'sent successfully'})
        
        elif template == 'nativetalk_account_creation_verification_support':
            first_name = details['first_name']
            last_name = details['last_name']
            business_name = details['business_name']
            customer_email = details['customer_email']
            work_address = details['work_address']
            nin_number = details['nin_number']
            did_number = details['did_number']
            extensions = details['extensions']

            if extensions == '2(free)':
                header_text = 'A new user has signed up for a free account.'
            else:
                header_text = f'A new user has created a standard account, with {extensions} extensions'

            message = MIMEMultipart('alternative')            

            message['From'] = sender_email
            message['To'] = 'info@nativetalk.io'
            message['Subject'] = "Account Verification Notification!"

            message_body_plain = templates['nativetalk_account_creation_verification_support_plain'].substitute(first_name=first_name, last_name=last_name,
            business_name=business_name, customer_email=customer_email, work_address=work_address, nin_number=nin_number,
            did_number=did_number, header_text=header_text, extensions=extensions)
            message_body_html = templates['nativetalk_account_creation_verification_support_html'].substitute(first_name=first_name, last_name=last_name,
            business_name=business_name, customer_email=customer_email, work_address=work_address, nin_number=nin_number,
            did_number=did_number, header_text=header_text, extensions=extensions)

            full_message_plain = MIMEText(message_body_plain, 'plain')
            full_message_html = MIMEText(message_body_html, 'html')

            message.attach(full_message_plain)
            message.attach(full_message_html)

            context = ssl.create_default_context()
            with smtplib.SMTP_SSL('mail.nativetalk.io', port, context=context) as server:
                server.login(sender_email, password)
                server.sendmail(sender_email, 'info@nativetalk.io', message.as_string())
                print('sent')
            return JsonResponse({'email status': 'sent successfully'})
        return HttpResponse('Looking for something?')
    else:
        return HttpResponse('Searching for something?')


# Define different email templates
templates = {
    'nativetalk_account_creation_verification_customer': Template('''
    Hello $to_name,

    Thank you for registering with NativeTalk, a member of the team is checking your account right now.
    Once your account has been validated, you will receive an email within 48 hours.

    Do not hesitate to contact us if you need any further assistance. 09077766575.

    Thank you
    NativeTalk Team
    
    ------------------------------------
    ------------------------------------'''),

    'nativetalk_account_creation_verification_support_plain': Template('''
    $header_text

    Names: $first_name $last_name
    Business Name: $business_name
    Email Address: $customer_email
    Work Address: $work_address
    NIN Number: $nin_number
    Extensions to be created:  $extensions
    DID Number: $did_number

    Regards.
    '''),

    'nativetalk_account_creation_verification_support_html': Template('''
    $header_text

    <html>
        <body>
            <p>$header_text</p>

            <table>
                <tr>
                    <td>Names</td>
                    <td>$first_name $last_name</td>
                </tr>
                <tr>
                    <td>Business Name</td>
                    <td>$business_name</td>
                </tr>
                <tr>
                    <td>Email Address</td>
                    <td>$customer_email</td>
                </tr>
                <tr>
                    <td>Work Address</td>
                    <td>$work_address</td>
                </tr>
                <tr>
                    <td>NIN Number</td>
                    <td>$nin_number</td>
                </tr>
                <tr>
                    <td>Extensions to be created</td>
                    <td>$extensions</td>
                </tr>
                <tr>
                    <td>DID Number</td>
                    <td>$did_number</td>
                </tr>
            </table>

            <p>Regards.</p>
        <body>
    </html>
    ''')
}        
