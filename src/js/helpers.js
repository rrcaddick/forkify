import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = null) {
  try {
    const fetchOptions = {
      method: `${uploadData ? 'POST' : 'GET'}`,
      headers: {
        'Content-Type': 'application/json',
      },
      ...(uploadData && { body: JSON.stringify(uploadData) }),
    };

    const res = await Promise.race([fetch(url, fetchOptions), timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};
