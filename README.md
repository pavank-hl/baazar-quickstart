
# Baazar Quickstart (JavaScript Demo)

A simple demonstration of how to build a **pay-to-play web application** using the **Coinbase Developer Platform (CDP)** and **X402** protocol.
This example shows how to integrate **microtransactions** into an Express.js app using `x402-express` and how to consume those APIs securely using `x402-fetch`.

## Features

This demo application demonstrates:

1. **CDP SDK Integration** – Setting up a CDP account using the Coinbase SDK
2. **Payment Middleware** – Using `x402-express` to monetize API endpoints
3. **X402 Payments** – Handling paid fetch requests via `x402-fetch`
4. **Game Logic** – Building a simple Rock–Paper–Scissors game with payment enforcement
5. **Catalog Discovery** – Listing available X402 APIs from the CDP catalog

## Prerequisites

* Node.js 18 or higher
* [pnpm](https://pnpm.io/) package manager
* A Coinbase Developer Platform (CDP) account
* Access to **Base Sepolia testnet**

## Installation

1. Install dependencies:

```bash
pnpm install
```

2. Create a `.env` file in the root directory and include your CDP credentials:

```env
CDP_API_KEY_ID=your_api_key_id_here
CDP_API_KEY_SECRET=your_api_key_secret_here
CDP_WALLET_SECRET=your_wallet_secret_here
```

## Getting CDP Credentials

1. Visit the [CDP Portal](https://portal.cdp.coinbase.com)
2. Create a new project or select an existing one
3. Navigate to **Settings > API Keys**
4. Click **Create API Key**
5. Download the credentials and place them in your `.env` file

## Usage

You can run both the **seller** (API server) and **buyer** (client) parts of the demo.

### 1. Start the Payment-Enabled Server

```bash
node index.js
```

This server exposes a single paid endpoint:

* **POST /rps/play**

  * Price: `$0.001` (Base Sepolia testnet)
  * Description: “Pay to play Rock–Paper–Scissors”
  * Input: `{ "move": "rock" | "paper" | "scissors" }`
  * Output: `{ "serverMove": "...", "userMove": "...", "outcome": "win|lose|draw" }`

Example console output:

```
Server listening at http://localhost:4021
```

### 2. Run the Buyer Script

```bash
node buyer.js
```

The script uses:

* `@coinbase/cdp-sdk` to load your CDP account
* `x402-fetch` to make paid requests
* `decodeXPaymentResponse` to read payment receipts

Example output:

```
Game result: { serverMove: 'rock', userMove: 'paper', outcome: 'win' }
Payment receipt: {...}
```

### 3. (Optional) List Publicly Discoverable APIs

```bash
node list-catalog.js
```

This will fetch and print all X402 resources listed in the CDP discovery catalog.

## Security Best Practices

1. **Never commit your `.env` file** – Add it to `.gitignore`
2. **Use testnets** – Test on Base Sepolia before mainnet
3. **Rotate keys regularly** – Ensure credential hygiene
4. **Validate payment receipts** – Always verify payment headers before processing
