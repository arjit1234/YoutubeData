const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 4001;
const { home, videos, getVideos, getchannelData } = require('./routes/channel');
const admin  = require('firebase-admin');
const credentails = require('./key.json');
const cors = require('cors');

admin.initializeApp({
    credential: admin.credential.cert(credentails)
})

const db  = admin.firestore();
app.use(express.json())

app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend server URL
    credentials: true, // Allow cookies to be sent to/from the frontend
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '/'));
// });

app.get("", (req, res) =>{
    res.json({message : "Hello Arjit"});
})

app.use('/home', home);
app.use('/videos', videos);
app.use('/getVideos', getVideos);
app.use('/getchannelData', getchannelData);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });