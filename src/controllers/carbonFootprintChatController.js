import { spawn } from "child_process";
import CarbonFootprint from "../models/carbonFootprintModel.js"; // Ensure the model file has the .js extension
import dotenv from "dotenv";
import { appconfig } from "../config/appconfig.js";

export const chatWithMistralAI = async (req, res) => {
  try {
    // Fetch the latest CarbonFootprint data from the database for the logged-in user
    const carbonData = await CarbonFootprint.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .limit(1);

    if (!carbonData || carbonData.length === 0) {
      return res
        .status(404)
        .json({ error: "Carbon footprint data not found for the user." });
    }

    // Construct the message/question with fetched values
    const messageContent = `
        Analyze the following carbon footprint data and provide a detailed response that includes:
        1. **Tips**: Offer five actionable tips to reduce the carbon footprint based on the provided data.
        2. **Main Contributor**: Identify the main contributor to the user's carbon footprint based on the maximum value from the data.
        3. **Precautionary Measures**: Suggest precautionary measures the user can take to further mitigate their impact.
        4. **Comparison with Standard Data**: Compare the user's consumption levels with standard benchmarks for an average individual in a developed country, specifying areas of concern or improvement.
        Petrol Consumption per month (in litres): ${carbonData[0].Petrol},
        Diesel consumption per month (in litres): ${carbonData[0].Diesel},
        Electricity consumption per month (in kWh): ${carbonData[0].Electricity},
        Natural Gas Consumption (in kg): ${carbonData[0].NaturalGas},
        CNG Consumption (in kg): ${carbonData[0].CNG},
        Distance Travelled through flight (in km): ${carbonData[0].Flight},
        LPG used per month (in kg): ${carbonData[0].LPG},
        Fuel oil used per month (in litres): ${carbonData[0].FuelOil},
        Coal used per month (in kg): ${carbonData[0].Coal}
        `;

    console.log("Question for Mistral AI:", messageContent);

    // Spawn the Python process to handle AI processing
    const pythonProcess = spawn("python", [
      "app.py",
      JSON.stringify(messageContent),
    ]);

    let responseData = "";
    let errorOccurred = false;

    // Collect data from Python script's stdout
    pythonProcess.stdout.on("data", (data) => {
      console.log(`Python script output: ${data}`);
      responseData += data.toString();
    });

    // Handle any errors from the Python script's stderr
    pythonProcess.stderr.on("data", (data) => {
      console.error(`Error from Python script: ${data}`);
      errorOccurred = true;
      if (!res.headersSent) {
        res
          .status(500)
          .json({ error: "An error occurred while processing the data." });
      }
    });

    // When the Python script is done processing
    pythonProcess.on("close", (code) => {
      if (!errorOccurred && !res.headersSent) {
        try {
          const parsedResponse = JSON.parse(responseData); // Parse the JSON response
          res.json(parsedResponse); // Send the structured response to the client
        } catch (parseError) {
          console.error("Error parsing AI response:", parseError);
          res.status(500).json({ error: "Failed to parse AI response." });
        }
      }
    });
  } catch (err) {
    console.error("Error fetching or processing carbon footprint data:", err);
    if (!res.headersSent) {
      res
        .status(500)
        .json({
          error:
            "An error occurred while fetching or processing carbon footprint data.",
        });
    }
  }
};
