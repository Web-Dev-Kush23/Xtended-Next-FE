export default async function handler(req, res) {
    const { propertyId, originalAmount } = req.query;
    const token = req.cookies;
    // Simulate data fetching based on query parameters



    const data = {
      propertyId,
      originalAmount,
      details: `Details for property ${propertyId} with original amount ${originalAmount}`
    };
  
    res.status(200).json(data);
  }