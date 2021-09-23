# Soap Request To Json

Does a SOAP request and returns JSON string.

# Usage

## `Installation`

```
npm install soap-req-json
// or
yarn add soap-req-json
```

## `Quick Start`

```
const srj = require('soap-req-json');

// SOAP Envelope
const envelope = `
  <SOAP-ENV:Envelope
    xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/"
    SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/"/>
    <SOAP-ENV:Header>
        <t:Transaction :t="some-URI" SOAP-ENV:mustUnderstand="1">5</t:Transaction>
    </SOAP-ENV:Header>
  </SOAP-ENV:Envelope>`;

// URL
const url = 'https://electrocommerce.org/abc/service';

// The SOAPAction HTTP Header Field
const SOAPAction = 'https://electrocommerce.org/abc#MyMessage';

const jsonString = await srj({ envelope, url, SOAPAction })
```

## `Options`

| Option       | Type                                       | Required |
|--------------|--------------------------------------------|----------|
| `envelope`   | `string` SOAP Envelope                     | `true`   |
| `url`        | `url`                                      | `true`   |
| `SOAPAction` | `string` The SOAPAction HTTP Header Field. | `true`   |
| `timeout`    | `number` Timeout request. Default `0`      | `false`  |


## `Error messages`

| Message           | Description                  |
|-------------------|------------------------------|
| `INVALID_URL`     | URL could not be parsed.     |
| `REQUEST_TIMEOUT` | Request timeout.             |
| `SERVER_ERROR`    | Server responded with error. |


# Dependencies

## `dependencies`

| Package | Description                                                         |
|---------|---------------------------------------------------------------------|
| xml-js  | Convert XML text to Javascript object / JSON text (and vice versa). |


## `devDependencies`

| Package     | Description                                                          |
|-------------|----------------------------------------------------------------------|
| @types/node | This package contains type definitions for Node.js                   |
| typescript  | JavaScript compiler/type checker that boosts JavaScript productivity |