# SHORTLY - URL Shortener

### Shortly is a simple and efficient URL shortener that allows you to shorten long URLs. Additionally, you can customize your URL links according to your brand.

### Built with
* NextJS
* ExpressJS
* PostgreSQL
* NanoID(for generating unique links)

## Features
* Shorten URLs: Convert your lengthy URLs into short URLs making them easier to share.
* Custom URLs: Customize your URLs to personalize links.

## How to Use
Shorten URL: Simply enter your long URL and click on the 'Shorten' button. Shortly will generate a short URL for you.
Customize URL: If you want to customize the URL, enter your desired path in the 'Custom URL' field before clicking on the 'Shorten' button.

## Running the Project Locally
#### To run Chronicles on your local machine, clone or download the repository and follow these steps:

#### To run the Express backend:
Change into the project directory e.g
```
cd server
```
Install dependencies:
```
npm install
```
Start the dev server:
```
npm start
```
The development server will start at http://localhost:5000

#### To run the NextJS frontend:
Change into the project directory e.g
```
cd client
```
Install dependencies:
```
npm install
```
Start the dev server:
```
npm run dev
```
The development server will start at http://localhost:3000. You can open this URL in your web browser to view and use Shortly.

## Set up environmental variables
#### Make sure to add .env files in both the client and server directories and set up necessary environment variables e.g:
- `DATABASE_URL`: The connection string for your PostgreSQL database.
- `BACKEND_URL`: The URL of the backend application.

## Licensed by MIT
