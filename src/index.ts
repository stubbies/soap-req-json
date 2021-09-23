
import { URL } from 'url';
import { request } from 'https';
import { xml2json } from 'xml-js';

export interface SoapRequesJsonParams {
  envelope: string;
  url: string;
  SOAPAction: string;
  timeout?: number;
}

export enum ERRORS {
  INVALID_URL = 'INVALID_URL',
  REQUEST_TIMEOUT = 'REQUEST_TIMEOUT',
  SERVER_ERROR = 'SERVER_ERROR'
}

const getOptions = (p: SoapRequesJsonParams) => {
  try {
    const url = new URL(p.url);
    const options = {
      hostname: url.host,
      port: url.port,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'Content-Length': p.envelope.length,
        'SOAPAction': p.SOAPAction
      },
      timeout: p.timeout ?? 0
    };

    return options;

  } catch (e) {
    throw new Error(ERRORS.INVALID_URL);
  }
};

const soapRequestJson = async (p: SoapRequesJsonParams): Promise<string | Error> => {
  return new Promise((resolve, reject) => {
    const req = request(p.url, getOptions(p), (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        const json = xml2json(data, { compact: true, spaces: 2 });
        resolve(json);
      });
    });

    req.on('error', (err) => {
      reject(new Error(ERRORS.SERVER_ERROR));
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error(ERRORS.REQUEST_TIMEOUT));
    });

    req.write(p.envelope);
    req.end();
  });
};

export default soapRequestJson;