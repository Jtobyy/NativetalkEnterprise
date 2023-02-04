# NativeTalk Enterprise Website

The fontend of this website was built with React and Redux.
The website majorly consumed resources through ASTPP's APIs.
The website itself has a backend which doesn't do much. It majorly initiates email sending from servers to servers; mostly from
Nativetalk's email host mail.nativetlak.io (using username info@nativetalk.io) to customers email hosts using their email addresses.

## NativetalkBackend (Current)
This API service was built with Flask, a lightweight Python Framework

Endpoint: `https://apps.nativetalk.com.ng:447/flsk/`

### The follwing fields are compulsory
1) `to_email`: The email recipient
2) `email_template`: The email template to use

### The `email_template` field determines the specifics of the email.
Currently, there are just two templates
1) `new_signup_info`
2) `user_verification_email`

### Other fields are given below
If the template is (1)
- `first_name`
- `last_name`
- `business_name`
- `customer_email`
- `work_address`
- `nin_number`
- `extensions`
- `did_number`

if (2)
- `to_name`


## NativetalkEmailBackend (Old)
This API service was built with django.
As of writing, the only API provided by the backend initiates this email sending. It receives a `GET` request with the
following query strings.

Endpoint: `https://apps.nativetalk.com.ng:444/sendmail/`

- `template`: The template to use to send the email, at the moment, it can be any one of the following texts
  1. nativetalk_account_creation_verification_customer
  2. nativetalk_account_creation_verification_support

1. 
   - `to_email`: The customer's email address
   - `to_name`: The customer's full name

2.
   - `first_name`: The customer's first name
   - `last_name`: The customer's lst name
   - `business_name`: The customer's company or business name
   - `customer_email`: Also the customer's email address
   - `work_address`: The customer's work address
   - `nin_number`: The customer's nin number
   - `did_number`: The customer's did number
   - `extensions`: The amount of extensions the customer picked

  More templates can be added if need be.



## NativetalkFrontend
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

To view the live site, Open [http://nativetalk.io](http://nativetalk.io) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
