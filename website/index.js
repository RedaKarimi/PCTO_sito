const express = require("express")
const cors = require("cors")

const app = express();

app.use(express.json());
app.use(cors());

app.post("/email",(req,res) => {
    const email = req.body.getEmail;
    console.log(email)
});

app.listen(8080,()=>{
    console.log("server is running");
})