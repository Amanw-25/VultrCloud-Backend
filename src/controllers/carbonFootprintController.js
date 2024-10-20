import CarbonFootprint from '../models/carbonFootprintModel.js';

export const calculateCarbonFootprint = async (req, res) => {
  try {
    // Extract the user ID from the authenticated user (JWT payload)
    const userId = req.user._id; // Assuming the user ID is added to the request by the auth middleware

    // Calculate carbon footprint using a method in the CarbonFootprint model
    const carbonData = await CarbonFootprint.calculate(req.body);

    // Add the user ID to the carbon data
    carbonData.user = userId;

    // Create a new instance of CarbonFootprint model with the calculated data and user ID
    const carbonFootprint = new CarbonFootprint(carbonData);

    // Save the carbon footprint data to the database
    const savedCarbonFootprint = await carbonFootprint.save();

    // Respond with the saved carbon footprint data
    res.json({
      carbonFootprint: savedCarbonFootprint
    });
  } catch (error) {
    console.error('Error calculating carbon footprint:', error);
    // If an error occurs, respond with a 500 status and an error message
    res.status(500).json({ error: 'Internal server error' });
  }
};
