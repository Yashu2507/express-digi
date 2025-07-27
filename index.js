import express from 'express'

const app = express()

app.use(express.json()) //Inorder to accept the data from the front end side. which has to be in JSON format

let teaData = []
let nextId = 1
//Add a New Tea
app.post('/teas', (req,res)=>{

  const {name,price, description} = req.body 
  const newTea = {id: nextId++, name, price, description}
  teaData.push(newTea)
  res.status(201).send(newTea)
})
//Get All new Tea
app.get('/teas',(req,res) =>{
  res.status(200).send(teaData)
})
//Get the tea by Id
app.get('/teas/:id', (req, res)=>{
 const tea = teaData.find(t=>t.id === parseInt(req.params.id))//checkin id with paramater id(ussually Strings so converted to Int)
  if(!tea){
    return res.status(404).send('Tea not Found')
  }
  res.status(200).send(tea)
})

//Update the Tea

app.put('/teas/:id',(req,res)=>{
  const tea = teaData.find(t=>t.id === parseInt(req.params.id))//grabbing the id using params and updating it
   if(!tea){
    return res.status(404).send('Tea not Found')
  }
  const {name,price} = req.body
  tea.name = name
  tea.price = price
  res.status(200).send(tea)
})

//Delete
app.delete('/teas/:id',(req,res)=>{
  const index = teaData.findIndex(t=>t.id === parseInt(req.params.id))
  if(index === -1){
    return res.status(404).send('tea not found')
  }

  teaData.splice(index,1)
  return res.status(200).send('deleted')

})

// app.get("/",(req,res) => {
//   res.send("Hello from Yash!!")
// })

// app.get("/ice-tea",(req,res) => {
//   res.send("What ice tea would you prefer?")
// })

// app.get("/twitter",(req,res) => {
//   res.send("yashdotcom")
// })



const port = 3000

app.listen(port, ()=>{
  console.log(`Server is running at port:${port}...`)
})