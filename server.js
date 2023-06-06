const express = require("express");
const sql = require("mssql");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const config = {
    user: 'sa',
    password: 'cleopatra',
    server: '192.168.250.207',
    database: 'at98db_lightcorporate',
    options: {
        "encrypt": false
      }
};

app.get('/api/data', async (req, res) => {
    try {
      await sql.connect(config);
      const result = await sql.query('SELECT TOP(10) VA_PREZZO_VEN FROM dbo.Articoli;');
      console.log(result);
      res.json(result.recordset);
    } catch (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Error fetching data');
    } finally {
      sql.close();
    }
  });

  app.listen(7777, () => {
    console.log("Running server on port 7777");
  });
