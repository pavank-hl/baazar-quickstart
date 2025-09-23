import { CdpClient } from "@coinbase/cdp-sdk";
import { toAccount } from "viem/accounts";
import { wrapFetchWithPayment, decodeXPaymentResponse } from "x402-fetch";
import dotenv from "dotenv";

dotenv.config()

const cdp = new CdpClient();
const cdpAccount = await cdp.evm.getAccount({ name: "buyer-account-1"});
const account = toAccount(cdpAccount);

// await cdp.evm.requestFaucet({
//   address: account.address,
//   network: "base-sepolia",
//   token: "usdc"
// });

const fetchWithPayment = wrapFetchWithPayment(fetch, account);

const playRPS = async (move) => {
    try {
        const response = await fetchWithPayment("https://baazar-quickstart-production.up.railway.app/rps/play", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ move }),
    });

    const result = await response.json();
    console.log("Game result:", result);

    const paymentResponse = decodeXPaymentResponse(response.headers.get("x-payment-response"));
    console.log(paymentResponse);
    } catch (error) {
        console.log(error);
    }
}

await playRPS("rock");