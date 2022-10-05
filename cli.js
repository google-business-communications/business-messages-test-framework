#!/usr/bin/env node

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

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appRoot = path.resolve(__dirname);
import { spawn } from 'node:child_process';

const ls = spawn(appRoot+'/node_modules/mocha/bin/_mocha', [appRoot+'/test/index-test.js']);

ls.stdout.on('data', (data) => {
  console.log(data.toString());
});

ls.stderr.on('data', (data) => {
  console.error(data.toString());
});

ls.on('close', (code) => {
  if (code == 0) {
    console.log('Tests completed successfully')
  } else {
    console.log(`Tests exited with error code ${code}`);
  }
});