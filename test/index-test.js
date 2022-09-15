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

const assert = require('assert');
const BmTestFramework = require('../index')
const fs = require('fs')
const { dirname } = require('path')
const appDir = dirname(require.main.filename)

describe('Test the endpoint', function () {
  const bmTestFramework = new BmTestFramework();
  describe('Sending payloads to '+bmTestFramework.endpointUrl, function () {
    const payloads = bmTestFramework.payloads()
    payloads.forEach(function(payload) {
      it(`${payload} should return 200`, function(done) {
        bmTestFramework.sendPayload(payload)
        .then(function(complete) {
          done()
        })
        .catch(function(err) {
          done(err)
        })
      })
    })
  });
});