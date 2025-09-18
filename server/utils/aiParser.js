// import OpenAI from "openai";
// const client = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY, // store in .env
// });
// export async function parseFinanceData(text) {
//   try {
//     const response = await client.chat.completions.create({
//       model: "gpt-4o-mini", // or gpt-4.1 / gpt-3.5
//       messages: [
//         {
//           role: "system",
//           content: "You are an AI that extracts structured financial transactions from raw text or PDF data."
//         },
//         {
//           role: "user",
//           content: `Extract transactions in JSON format with fields: date, description, amount, category.\n\nHere is the text:\n${text}`
//         }
//       ],
//     });

//     const aiText = response.choices[0].message.content;
//     return JSON.parse(aiText); // convert back to JSON
//   } catch (err) {
//     console.error("AI Parsing Error:", err);
//     throw new Error("Failed to parse data with AI");
//   }
// }
