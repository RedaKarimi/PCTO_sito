const express = require("express");
const sql = require("mssql");
const cors = require("cors");
const multer = require("multer");
const sgMail = require('@sendgrid/mail');

const app = express();
app.use(express.json());
app.use(cors());

const config = {
  user: 'PCTO_Stagisti',
  password: 'cleopatra',
  server: '192.168.250.52',
  database: 'PCTO_RK-LN',
  options: {
    enableArithAbort: true,
    trustedConnection: true,
    encrypt: false
  },
};

app.get('/get/data', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT product_name, category_id, price, image_data, product_body_part FROM dbo.Products;');
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
    const { product_name, product_body_part, category_id, price } = req.body;
    const imageData = req.file ? req.file.buffer : null;
    console.log('Received data:', req.body);
    console.log('Received Img:', imageData);
    const query = `
        INSERT INTO Products (product_name, product_body_part, category_id, price, image_data)
        VALUES (@ProductName, @ProductBDP, @CategoryId, @Price, @ImageData);
      `;
    const parameters = [
      { name: 'ProductName', type: sql.VarChar(100), value: product_name },
      { name: 'ProductBDP', type: sql.VarChar(3), value: product_body_part },
      { name: 'CategoryId', type: sql.Int, value: category_id },
      { name: 'Price', type: sql.Decimal(10, 2), value: price },
      { name: 'ImageData', type: sql.VarBinary(sql.MAX), value: imageData }
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

app.post('/register', async (req, res) => {
  try {
    await sql.connect(config);
    const { username, email, password, hashedPassword } = req.body;
    const admin =
      username === `Reda Karimi` || username === `Luca Niccia` ? 1 : 0;

    // Generate verification code
    const verificationCode = generateVerificationCode();

    const query = `
      INSERT INTO Accounts (usr_name, usr_email, usr_password, usr_hash_password, registration_date, is_admin, verification_code, is_verified)
      VALUES (@username, @email, @password, @hashedPassword, GETDATE(), @is_admin, @verificationCode, 0);
    `;

    const parameters = [
      { name: 'username', type: sql.VarChar(100), value: username },
      { name: 'email', type: sql.VarChar(100), value: email },
      { name: 'password', type: sql.VarChar(100), value: password },
      { name: 'hashedPassword', type: sql.VarChar(512), value: hashedPassword },
      { name: 'is_admin', type: sql.Int, value: admin },
      { name: 'verificationCode', type: sql.VarChar(6), value: verificationCode },
    ];

    const request = new sql.Request();
    parameters.forEach((param) => {
      request.input(param.name, param.type, param.value);
    });

    await request.query(query);

    sgMail.setApiKey('YOUR_SENDGRID_API_KEY');

    const msg = {
      to: email,
      from: 'PCTO.RK.LN@gmail.com',
      subject: 'Email Verification',
      text: `Your verification code is ${verificationCode}`,
      html: `
      <html>
        <head>
          <style>
            /* Define your CSS styles here */
            body {
              font-family: Arial, sans-serif;
            }
            .container {
              background-color: #f8f8f8;
              padding: 20px;
              border-radius: 5px;
            }
            h1 {
              color: #333;
              font-size: 24px;
              margin-bottom: 10px;
            }
            p {
              color: #555;
              margin-bottom: 5px;
            }
            strong {
              color: #000;
            }
            .button {
              display: inline-block;
              padding: 10px 20px;
              background-color: #4caf50;
              color: #fff;
              text-decoration: none;
              border-radius: 5px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Email Verification</h1>
            <p>Your verification code is <strong>${verificationCode}</strong></p>
            <a class="button" href="http://192.168.250.52:7777/verification">Go Verify</a>
          </div>
        </body>
      </html>
    `,
    };

    try {
      await sgMail.send(msg);
      console.log('Email sent successfully');
      res.sendStatus(200);
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    }
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Error');
  } finally {
    sql.close();
  }
});

app.post('/verify', async (req, res) => {
  try {
    await sql.connect(config);
    const { email, verificationCode } = req.body;

    const query = `
      UPDATE Accounts
      SET is_verified = 1
      WHERE usr_email = @email
        AND verification_code = @verificationCode;
    `;
    const parameters = [
      { name: 'email', type: sql.VarChar(100), value: email },
      { name: 'verificationCode', type: sql.VarChar(6), value: verificationCode },
    ];

    const request = new sql.Request();
    parameters.forEach((param) => {
      request.input(param.name, param.type, param.value);
    });

    const result = await request.query(query);

    if (result.rowsAffected[0] === 1) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Error');
  } finally {
    sql.close();
  }
});

const generateVerificationCode = () => {
  const code = Math.floor(100000 + Math.random() * 900000);
  return code.toString();
};

app.listen(3000, () => {
  console.log("Running server on port 3000");
});