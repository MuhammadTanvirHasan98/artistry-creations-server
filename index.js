const express = require('express');
const cors = require('cors');
const app = express();


// middlewares
app.use(cors());

const port = 4000;

const users =[
  {name:"Muhammad", age:26},
  {name:"Tanvir", age:26},
  {name:"Hasan", age:26}
]
app.get('/users', (req, res)=>{
   res.send(users);
})

app.get('/', (req, res)=>{
   res.send("My Artistry Creation Server is running here!")
})

app.listen(port, ()=>{
  console.log(`My server is listening on port ${port}`)
})