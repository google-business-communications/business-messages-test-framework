/*
 * Copyright (C) 2022 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */

import fs from 'fs';
import superagent from 'superagent';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appRoot = path.resolve(__dirname);

export default function BmTestFramework(config) {
  if (!this.endpointUrl || this.endpointUrl == null) {
    if (!process.env.BMTF_ENDPOINT_URL) {
      throw new Error("config.endpointUrl is required. You can also define it an env variable: BMTF_ENDPOINT_URL");
    } else {
      this.endpointUrl = process.env.BMTF_ENDPOINT_URL;
    }
  } else {
    this.endpointUrl = config.endpointUrl;
  }
  if (process.env.BMTF_RANDOM_UUID === true) {
    this.randomUUID = true;
  }

  this.payloads = function() {
    return fs.readdirSync(`${appRoot}/payloads/`);
  }

  this.sendPayload = function(payloadName) {
    const self = this;
    const promisedPayload = new Promise(function(resolve, reject) {
      try {
        const jsonObject = JSON.parse(fs.readFileSync(`${appRoot}/payloads/${payloadName}`))
        if (!jsonObject) {
          reject(new Error(`The payload ${payloadName} is invalid or does not exist`));
        }
        if (self.randomUUID) {
          jsonObject.conversationId = uuidv4();
        }
        superagent
        .post(self.endpointUrl)
        .send(jsonObject)
        .end(function(err, res) {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        });
      } catch(e) {
        reject(e);
      }
    })
    return promisedPayload;
  }
}