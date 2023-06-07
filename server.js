const express = require("express");
const sql = require("mssql");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(cors());

const config = {
  user: 'PCTO_Stagisti',
  password: 'cleopatra',
  server: 'localhost',
  database: 'PCTO_RK-LN',
  options: {
    enableArithAbort:true,
    trustedConnection: true,
    encrypt: false
  },
};

app.get('/get/data', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT product_name, category_id, price, image_data,product_body_part FROM dbo.Products;');
    const records = result.recordset.map((record) => {
      const base64Image = Buffer.from(record.image_data, 'binary').toString('base64');
      return {
        product_name: record.product_name,
        product_body_part: record.product_body_part,
        category_id: record.category_id,
        price: record.price,
        image_data: base64Image,
      };
    });
    res.json(records);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Error fetching data');
  } finally {
    sql.close();
  }
});
const storage = multer.memoryStorage();
const upload = multer({ storage });
app.post('/put/data', upload.single("imageFile"), async (req, res) => {
  try {
    await sql.connect(config);
    const { product_name,product_body_part, category_id, price } = req.body;
    const imageData = req.file ? req.file.buffer : null;
    console.log('Received data:', req.body);
    console.log('Received Img:', imageData);
    const query = `
        INSERT INTO Products (product_name,product_body_part, category_id, price, image_data)
        VALUES (@ProductName,@ProductBDP, @CategoryId, @Price, @ImageData);
      `;
    const parameters = [
      { name: 'ProductName', type: sql.VarChar(100), value: product_name },
      { name: 'ProductBDP', type: sql.VarChar(3), value: product_body_part },
      { name: 'CategoryId', type: sql.Int, value: category_id },
      { name: 'Price', type: sql.Decimal(10, 2), value: price },
      { name: 'ImageData', type: sql.VarBinary(sql.MAX), value: imageData}
    ];
    
    console.log('Sent Img:', parameters[3]);
    const request = new sql.Request();
    parameters.forEach(param => {
      request.input(param.name, param.type, param.value);
    });
    await request.query(query);
    res.sendStatus(200);
  } catch (err) {
    console.error('Error inserting image:', err);
    res.status(500).send('Error inserting image');
  } finally {
    sql.close();
  }
});

app.listen(7777, () => {
  console.log("Running server on port 7777");
});