import express from "express";
import { paymentMiddleware } from "x402-express";

const app = express();
app.use(express.json());

app.use(
  paymentMiddleware(
    "0xB1De43C2Ca1195258FEE160adAcB1820c3776B7D",
    {
      "POST /rps/play": {
        price: "$0.001", // USDC testnet price
        network: "base-sepolia",
        config: {
          name: "Rock–Paper–Scissors",
          description: "Pay to play a simple game of Rock–Paper–Scissors.",
          discoverable: true,
          inputSchema: {
            type: "object",
            properties: {
              move: {
                type: "string",
                enum: ["rock", "paper", "scissors"],
                description: "Your move",
              },
            },
            required: ["move"],
          },
          outputSchema: {
            type: "object",
            properties: {
              playerMove: { type: "string" },
              serverMove: { type: "string" },
              outcome: { type: "string" },
            },
          },
        },
      },
    },
    {
      url: "https://x402.org/facilitator",
    }
  )
);

const moves = ["rock", "paper", "scissors"];

function getOutcome(player, server) {
  if (player === server) return "draw";
  if (
    (player === "rock" && server === "scissors") ||
    (player === "paper" && server === "rock") ||
    (player === "scissors" && server === "paper")
  ) {
    return "win";
  }
  return "lose";
}

app.post("/rps/play", (req, res) => {
  const { move } = req.body;

  if (!moves.some((m) => m === move)) {
    return res.status(400).send({ error: "Move must be rock, paper, or scissors" });
  }

  const serverMove = moves[Math.floor(Math.random() * moves.length)];
  const outcome = getOutcome(move, serverMove);

  res.send({
    playerMove: move,
    serverMove,
    outcome,
  });
});

// ----- Server -----
app.listen(4021, () => {
  console.log(`Server listening at http://localhost:4021`);
});
