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
    const result = await sql.query('SELECT product_name,product_id,category_id, price, image_data, product_body_part FROM dbo.Products;');
    const records = result.recordset.map((record) => {
      const base64Image = Buffer.from(record.image_data, 'binary').toString('base64');
      return {
        product_name: record.product_name,
        product_id: record.product_id,
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

    const checkQuery = `
      SELECT COUNT(*) AS count
      FROM Accounts
      WHERE usr_email = @email OR usr_name=@username;
    `;
    const checkParameters = [
      { name: 'username', type: sql.VarChar(100), value: username },
      { name: 'email', type: sql.VarChar(100), value: email },
    ];
    const checkRequest = new sql.Request();
    checkParameters.forEach((param) => {
      checkRequest.input(param.name, param.type, param.value);
    });
    const checkResult = await checkRequest.query(checkQuery);
    const accountExists = checkResult.recordset[0].count > 0;

    if (accountExists) {
      return res.sendStatus(409);
    }

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

    sgMail.setApiKey('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');

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
            <a class="button" onclick="copyText()">Copy into clipboard</a>
          </div>

          <script>
          function copyText() {
              navigator.clipboard.writeText(${verificationCode});
          }
      </script>
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
      res.sendStatus(501);
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

app.post('/login', async (req, res) => {
  try {
    await sql.connect(config);
    const { username, password } = req.body;
    console.log(username,password)
    const query = `
        SELECT account_id, usr_name, usr_email, usr_password, usr_hash_password, registration_date, is_admin, is_verified, last_login
        FROM dbo.Accounts
        WHERE usr_name = @username AND usr_password = @password;
    `;
    const checkRequest = new sql.Request();
    checkRequest.input('username', sql.VarChar(100), username);
    checkRequest.input('password', sql.VarChar(100), password);

    const result = await checkRequest.query(query);
    const records = result.recordset.map((record) => {
      return {
        account_id: record.account_id,
        cart_id: record.cart_id,
        username: record.usr_name,
        password: record.usr_password,
        is_admin: record.is_admin,
        registration_date: record.registration_date
      };
    });
    console.log(result)
    console.log(result.recordset)
    if (result.recordset.length === 0) {
      return res.sendStatus(405);
    } else{
      res.status(200)
      res.json(records);
    }
    
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Error fetching data');
  } finally {
    sql.close();
  }
});

app.post('/put/items', async (req, res) => {
  try {
    await sql.connect(config);
    const { product_id, account_id, quantity } = req.body;
    const query = `MERGE INTO ShoppingCart AS Target
    USING (VALUES (@product_id, @quantity, @account_id)) AS Source (product_id, quantity, account_id)
        ON (Target.product_id = Source.product_id AND Target.account_id = Source.account_id)
    WHEN MATCHED THEN
        UPDATE SET Target.quantity = Target.quantity + Source.quantity
    WHEN NOT MATCHED THEN
        INSERT (product_id, quantity, account_id)
        VALUES (Source.product_id, Source.quantity, Source.account_id);
    
      `;
    const parameters = [
      { name: 'product_id', type: sql.Int, value: product_id },
      { name: 'account_id', type: sql.Int, value: account_id },
      { name: 'quantity', type: sql.Int, value: quantity },
    ];
    const request = new sql.Request();
    console.log(parameters)
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
app.post('/remove/item', async (req, res) => {
  try {
    const product_id = req.body.product_id;
    const account_id = req.body.account_id;
    
    await sql.connect(config);
    
    const result = await sql.query(`
      MERGE INTO ShoppingCart AS Target
      USING (
        SELECT product_id, quantity - 1 AS quantity, account_id
        FROM ShoppingCart
        WHERE product_id = @product_id AND account_id = @account_id
      ) AS Source (product_id, quantity, account_id)
      ON (Target.product_id = Source.product_id AND Target.account_id = Source.account_id)
      WHEN MATCHED THEN
        UPDATE SET Target.quantity = Source.quantity
      WHEN NOT MATCHED THEN
        DELETE;
    `, {
      product_id: product_id,
      account_id: account_id
    });
    
    res.sendStatus(200);
  } catch (err) {
    console.error('Error removing item:', err);
    res.status(500).send('Error removing item');
  } finally {
    sql.close();
  }
});


app.get('/get/items', async (req, res) => {
  try {
    const {account_id} = req.body; // Assuming the account_id is provided in the request body

    const pool = await sql.connect(config);

    const result = await pool.request()
      .input('account_id', sql.Int, account_id)
      .query(`
        SELECT p.product_name, p.product_id, p.category_id, p.price, p.image_data, p.product_body_part, sc.quantity
        FROM dbo.Products AS p
        JOIN ShoppingCart AS sc ON p.product_id = sc.product_id
        WHERE sc.account_id = @account_id;
      `);

    const records = result.recordset.map((record) => {
      const base64Image = Buffer.from(record.image_data, 'binary').toString('base64');
      return {
        product_name: record.product_name,
        product_id: record.product_id,
        product_body_part: record.product_body_part,
        category_id: record.category_id,
        price: record.price,
        quantity: record.quantity,
        image_data: base64Image,
      };
    });
      console.log(account_id);
    res.json(records);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Error fetching data');
  } finally {
    sql.close();
  }
});
app.post('/rem/items', async (req, res) => {
  try {
    await sql.connect(config);
    const { account_id } = req.body;
    const query = `  SELECT p.product_name, p.product_id, p.category_id, p.price, p.image_data, p.product_body_part, sc.quantity
    FROM dbo.Products AS p
    JOIN ShoppingCart AS sc ON p.product_id = sc.product_id
    WHERE sc.account_id = @account_id;
    
      `;
    const parameters = [
      { name: 'account_id', type: sql.Int, value: account_id },
    ];
    const request = new sql.Request();
    console.log(parameters)
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
app.listen(3000, () => {
  console.log("Running server on port 3000");
});

