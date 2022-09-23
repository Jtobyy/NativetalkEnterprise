"""
Test mail sending endpoint
"""
import requests


template1 = "nativetalk_account_creation_verification_support"
to_name = "John Doe"
to_email = "jtobi8161@gmail.com"

template2 = "nativetalk_account_creation_verification_support"
first_name = "John"
last_name = "Doe"
customer_email = "jtobi8161@gmail.com"
business_name = "JohnDoeltd"
work_address = "Silicon valley, 98 dope street"
nin_number = "12345678910"
did_number = "2424824924"
extensions = "24 (test number)"

request1 = """
https://apps.nativetalk.com.ng:444/sendmail/{}".format(f'?template={template1}&to_name={to_name}&to_email={to_email}')
""")
request2 = """
https://apps.nativetalk.com.ng:444/sendmail/{}".format(f'?template={template2}&first_name={first_name}&last_name={last_name}
&customer_email={jtobi8161@gmail.com}&business_name={business_name}&work_address={work_address}&nin_number={nin_number}
&did_number={did_number}&extensions={extensions}')
""")

response1 = request.get(request1)
print(response1.text)
print(response1.json())

response2 = request.get(request2)
print(response2.text)
print(response2.json())

