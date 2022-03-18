
# Project setup

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

- In a new terminal session, navigate to the project folder.
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

Deployed contract to testnet: 0x3f7a8AE47d66df8eDBeC15f3dC75D929466bc66d
https://alfajores-blockscout.celo-testnet.org/address/0x3f7a8AE47d66df8eDBeC15f3dC75D929466bc66d/transactions
