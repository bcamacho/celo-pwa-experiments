__Question:__ Why are multiple directories listed as p0+? 

__Answer:__ To show the iteration of the codebase from web2 PWA to web3. Each p equals a project part that builds up from the previous codebase directory. 

# Project setup

Currently under development. The goal is a multi-part progressive web app boilerplate utilizing general purpose EVM tooling to achieve:

- Progressive web app
  - Cache data
  - Offline detection
- Reading
  - Account balance
  - Transaction data
- Converting
  - Transaction data from Hex to ASCII
- Interacting with smart contract
  - Calling contract function
  - Signing Transaction


### Requirements
For this project, you’ll need:
- Node.js v12+ for the server
- Express for server framework
  -  ```npm install -g express```
- Nodemon to debug the server
  - ```npm install -g nodemon```
- Chrome to check the website and debug
- OpenSSL to generate a self-signed certificate (local development)

### Configuring Project

- In a new terminal session, navigate to the project folder part.
- Install the project dependencies: ```npm i```
- Navigate terminal session to _certs directory
- Generate self-signed certificates
```
openssl req -x509 -out localhost.crt -keyout localhost.key \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=localhost' -extensions EXT -config <( \
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
```
- Within your terminal session, go back to the previous folder (project root part)
- Start your local server ```npm start server-debug```
- In a new terminal session, start chrome with the following command:
```
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --user-data-dir=/tmp/foo --ignore-certificate-errors --unsafely-treat-insecure-origin-as-secure=https://localhost
```
