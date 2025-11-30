// Vercel Serverless Function untuk polling data
// File: api/polling.js

let pollingData = { ya: 0, tidak: 0, timestamp: Date.now() };

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    // Return current polling data
    return res.status(200).json(pollingData);
  }

  if (req.method === 'POST') {
    // Update polling data
    const { ya, tidak } = req.body;
    
    if (typeof ya === 'number' && typeof tidak === 'number') {
      pollingData = {
        ya: ya,
        tidak: tidak,
        timestamp: Date.now()
      };
      return res.status(200).json({ success: true, data: pollingData });
    }
    
    return res.status(400).json({ error: 'Invalid data' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
