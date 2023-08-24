// const express=require('express')
// const cors=require("cors")
// const mongoose=require('mongoose');
// const router = require('./routes/data');

// // const PORT=8000;

// // const app=express()
// // app.use(express.json())
// // app.use(cors())

// // app.use('/',router)




// // const URI="mongodb://localhost:27017/blackcoffer"
// // mongoose.connect(URI).then(()=>{
// //     app.listen(PORT,()=>{
// //         console.log(`server is running ${PORT}`)
// //     })
// // }).catch((error)=>{
// //     console.log(error)
// // })  
// // const express = require('express');
// // const mongoose = require('mongoose');

// // const app = express();
// // app.use(express.json());

// // // Connect to MongoDB
// // mongoose.connect('mongodb://localhost:27017/mydatabase', {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true
// // });

// const PORT=8000;
// const app=express()
// app.use(express.json())
// app.use(cors())

// app.use('/',router)

// mongoose.connect("mongodb+srv://Jabez:jabezkershom@cluster0.djujjbx.mongodb.net/", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => {
//     app.listen(PORT,()=>{
//                 console.log(`server is running ${PORT}`)
//             })
//   console.log('Connected to MongoDB');
// }).catch(error => {
//   console.error('Error connecting to MongoDB:', error);
// });

const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/data');
const cors=require('cors')
; // Replace with the actual path to your newsRoutes

const app = express();
app.use(express.json());
app.use(cors())

mongoose.connect('mongodb+srv://Jabez:jabezkershom@cluster0.djujjbx.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(error => {
  console.error('Error connecting to MongoDB:', error);
});

app.use('/', router); // Use the newsRoutes for the '/api' route

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
