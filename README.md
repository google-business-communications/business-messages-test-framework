# [Google's Business Messages: Test Framework](https://github.com/google-business-communications/bm-test-framework-nodejs)

[Business Messages](https://developers.google.com/business-communications/business-messages/guides/learn) is a mobile conversational channel that combines entry points on Google Maps, Search, and brand websites to create rich, asynchronous messaging experiences.

This NPM package is the fastest way to [test your webhook endpoint](https://developers.google.com/business-communications/business-messages/guides/how-to/message/receive). You can use it to send all of the Business Messages payloads to your test or production webhook and see if anything breaks. It takes 5 seconds to start using it. It's easily expandable and you can integrate it with your CI/CD process.

## Quick start

Install this package as global:

```bash
npm install -g bm-test-framework
```

Now you can test your endpoint with an environment variable like so:

```bash
BMTF_ENDPOINT_URL=http://localhost:3000/callback bm-test-framework
```

You will need to replace `http://localhost:3000/callback` in the command above with the URL of your test or production webhook.

Once you run this command, your console will show something like:
```bash
  Test the endpoint
    Sending payloads to http://localhost:3000/callback
      ✔ authentication-request.json should return 200
      ✔ event-receive.json should return 200
      ✔ image-message.json should return 200 (862ms)
      ✔ read-receipt.json should return 200
      ✔ suggestion-message.json should return 200
      ✔ text-message.json should return 200 (134ms)
      ✔ text-with-dialogflow-response.json should return 200 (128ms)
      ✔ user-receipt.json should return 200
```

## Usage in your NodeJS project

If you are using NodeJS for your project, you can use this package from inside your Mocha test suite or inside your code.
To do so, first install it as a local dev-dependency like so:

```bash
npm install --save-dev bm-test-framework
```

Now you can initialize the object like so:

```javascript
const BmTestFramework = require('bm-test-framework');
const bmTestFramework = new BmTestFramework({endpointURL: YOUR_ENDPOINT_URL_HERE});

//Once initialized, you can access an array containing the names of the different payloads here:
let payloads = bmTestFramework.payloads; //[ 'image-message.json', 'text-message.json', etc]

//To send a payload, call .sendPayload using the name of the payload:
bmTestFramework.sendPayload(payloads[0]) //sends the first payload
```

## Usage in your CI/CD pipeline (Coming soon)

This repository will contain a Dockerfile that dockerizes this test and allows you to use it in your CI/CD pipeline. This feature is coming, so please leave an [issue on Github](https://github.com/google-business-communications/business-messages-test-framework/issues) if you have any question.

## Customizing your tests

### Realistic UUID

By default, the conversation-id of the tests will be CONVERSATION-ID. This is not a very realistic ID, as the best practice for conversation-ids is to use a UUID. In order to have your tests run with realistic UUID as conversation-ids, you can run your test with this environment variable:

`BMTF_RANDOM_UUID=true`

Which will switch the conversation-ids used in your tests to realistic-looking UUID. Please note that these IDs will not be valid, but they are formatted as if they were. The complete command will be:


```bash
BMTF_ENDPOINT_URL=http://localhost:3000/callback BMTF_RANDOM_UUID=true bm-test-framework
```

### Changing the timeout

You can change the timeout settings by adding this environment variable:
`BMTF_TIMEOUT`
So for example, to set it to 4000 milliseconds, your command will be:

```bash
BMTF_ENDPOINT_URL=http://localhost:3000/callback BMTF_TIMEOUT=4000 bm-test-framework
```

## Contributing

Contributions welcome! See the [Contributing Guide](https://github.com/google-business-communications/businessmessages-test-framework/CONTRIBUTING.md).

## License

Apache Version 2.0

See [LICENSE](https://github.com/google-business-communications/bm-test-framework-nodejs/LICENSE)