# Indee Watch 2.1 API Demo (React)

## Overview

This repository contains a demonstration of the Indee Watch 2.1 API using a React Application. The demo showcases the following capabilities:

- Displaying brands, projects, and videos associated with a given FYC (For Your Consideration) token in a tabular format.
- Automatic detection of API keys for screeners or Global Distribution, prompting for username and password to display corresponding data.

## Important Notice

**⚠️ This code is intended for demonstration purposes only. ⚠️**

Do not use API keys directly in client-side applications. For production use, always store API keys securely on your server and use them to establish the initial session through the `login` API.

## Prerequisites

Before running the demo, ensure you have the following:

- Node.js installed on your system (version specified in `.nvmrc`)
- API key and endpoint provided by Indee

## Setup

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Update the following environment variables in your `.env` file:
   - Replace `VITE_API_KEY` with your provided API key.
   - Replace `VITE_BASE_URL` with the API endpoint from the Indee API documentation.

## Installation

1. Install the required Node.js version
2. Install dependencies:
   ```
   npm install
   ```

## Running the Demo

1. Start the development server:
   ```
   npm run dev
   ```
2. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).
3. You should see the login page. Use your credentials to access the published content.

## Features

- **FYC Token Display**: View brands, projects, and videos associated with FYC tokens.
- **Automatic API Key Detection**: Identifies screener or Global Distribution API keys.
- **Secure Authentication**: Prompts for username and password when necessary.

## Best Practices

- Always use server-side authentication for API key management in production environments.
- Regularly update dependencies to ensure security and performance.
- Follow Svelte and SvelteKit best practices for maintainable and efficient code.

## Troubleshooting

If you encounter any issues:

1. Ensure all environment variables are correctly set.
2. Check that you're using the correct Node.js version. (Version Should match the one specified in .nvmrc file)
3. Clear your browser cache and restart the development server.

## Support

For any queries or support related to this demo or the Indee Watch 2.1 API, please contact our support team or refer to the official API documentation.

## License

This demo repository is licensed under the following terms.

Copyright 2024 Indee Technologies Inc.,

Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at

       http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed
under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
CONDITIONS OF ANY KIND, either express or implied. See the License for the
specific language governing permissions and limitations under the License.
