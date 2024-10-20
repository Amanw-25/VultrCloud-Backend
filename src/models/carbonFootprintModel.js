import mongoose from 'mongoose';

const carbonFootprintSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  Petrol: { type: Number, required: true },
  Diesel: { type: Number, required: true },
  Electricity: { type: Number, required: true },
  NaturalGas: { type: Number, required: true },
  CNG: { type: Number, required: true },
  Flight: { type: Number, required: true },
  LPG: { type: Number, required: true },
  FuelOil: { type: Number, required: true },
  Coal: { type: Number, required: true },
  TOTAL: { type: Number, required: true }
}, {
  timestamps: true
});

// Define the CarbonFootprint model
const CarbonFootprint = mongoose.model('CarbonFootprint', carbonFootprintSchema);

// Define the factors for each type of consumption
const factors = {
  petrol: 2.296,
  diesel: 2.716,
  electricity: 0.7132,
  naturalGas: 0.203,
  cng: 2.720,
  flight: 2.5,
  lpg: 3.014,
  fuelOil: 2.987,
  coal: 2.478
};

// Method to calculate the carbon footprint based on input data
CarbonFootprint.calculate = async function(data) {
  const carbonData = {
    Petrol: data.petrol * factors.petrol,
    Diesel: data.diesel * factors.diesel,
    Electricity: data.electricity * factors.electricity,
    NaturalGas: data.naturalGas * factors.naturalGas,
    CNG: data.cng * factors.cng,
    Flight: data.flight * factors.flight,
    LPG: data.lpg * factors.lpg,
    FuelOil: data.fuelOil * factors.fuelOil,
    Coal: data.coal * factors.coal
  };

  // Calculate the total carbon footprint
  carbonData.TOTAL = Object.values(carbonData).reduce((acc, curr) => acc + curr, 0);

  return carbonData;
};

export default CarbonFootprint;
