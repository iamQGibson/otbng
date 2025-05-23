const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');

// --- Add your Stripe secret key here ---
const stripe = Stripe('YOUR_STRIPE_SECRET_KEY_HERE');

const app = express();
const PORT = 3000;

app.use(cors());

const priceIdsByTable = {
  "table1": "price_001aaa",
  "table2": "price_002bbb",
  "table3": "price_003ccc",
  "table4": "price_004ddd",
  "table5": "price_005eee",
  "table6": "price_006fff",
  "table7": "price_007ggg",
  "table8": "price_008hhh",
  "table9": "price_009iii",
  "table10": "price_010jjj",
  "table11": "price_011kkk",
  "table12": "price_012lll",
  "table13": "price_013mmm",
  "table14": "price_014nnn",
  "table15": "price_015ooo",
  "table16": "price_016ppp",
  "table17": "price_017qqq",
  "table18": "price_018rrr",
  "table19": "price_019sss",
  "table20": "price_020ttt",
  "table21": "price_021uuu",
  "table22": "price_022vvv",
  "table23": "price_023www",
  "table24": "price_024xxx",
  "table25": "price_025yyy",
  "table26": "price_026zzz",
  "table27": "price_027aaa",
  "table28": "price_028bbb",
  "table29": "price_029ccc",
  "table30": "price_030ddd",
  "table31": "price_031eee",
  "table32": "price_032fff",
  "table33": "price_033ggg",
  "table34": "price_034hhh"
};


app.get('/tables', (req, res) => {
  const tables = Object.keys(priceIdsByTable).sort();
  res.json(tables);
});

app.get('/get-price', async (req, res) => {
  try {
    const table = req.query.table;

    if (!table || !priceIdsByTable[table]) {
      return res.status(400).json({ error: 'Invalid or missing table parameter' });
    }

    const priceId = priceIdsByTable[table];
    const price = await stripe.prices.retrieve(priceId);

    res.json({
      amount: price.unit_amount,
      currency: price.currency
    });
  } catch (error) {
    console.error('Stripe API error:', error);
    res.status(500).json({ error: 'Unable to get price from Stripe' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
