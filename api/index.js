const express = require('express');
const cors = require('cors')
const app = express();

const _PORT = process.env.PORT || 3000;

//  CORS
app.use(cors({
    origin: '*'
}))

app.get('/', (req, res, next) => {
    res.json({ status: true, message: "Recepit generation API" })
})


app.listen(_PORT, () => {
    console.log(`Server is listening on PORT : ${_PORT}`);
})