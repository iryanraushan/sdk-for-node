```
const sdk = require('node-appwrite');

const client = new sdk.Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('5df5acd0d48c2'); // Your project ID

const account = new sdk.Account(client);

const result = await account.createEmailToken(
    '<USER_ID>', // userId
    'email@example.com', // email
    false // phrase (optional)
);
```
