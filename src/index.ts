import express from "express";
import morgan from "morgan";
import cors from "cors";

const GstorageURL = "https://storage.googleapis.com/cdn2.trenderapp.com";
const port = 1025;

const app = express();

app.use(morgan('dev'))
app.use(cors());

app.get('/*', (req, res) => {
  res.redirect(`${GstorageURL}${req.url}`)
})

app.listen(port, () => {
  console.log(`🛥️  running on port ${port} 🛥️`);
})