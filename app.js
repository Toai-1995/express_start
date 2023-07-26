import express from 'express'
import bodyParser from'body-parser'
import {db} from './db/db.js'
import { error, log } from 'console'
const app = express()
const port = 3000

app.use(bodyParser.json())


app.get('/', (req, res) => { 
  db.query('SELECT * FROM list_item',(err, result, fields)=>{
    if (err) throw err;
    res.send({ result });
  })
})

app.post('/',(req, res)=>{
  const item = req.body;
  db.query(`INSERT INTO  list_item (item) VALUES ('${item.todo}')`,(error, )=>{
    if (error) throw error;
    res.send({
      status: '201',
    })
  })
})

app.put('/:id',(req, res) => {
  const id = req.params.id;
  const item = req.body;
  db.query(`UPDATE list_item SET item = '${item.todo}' WHERE id = '${id}'`,(error, )=>{
    if (error) throw error;
    res.send({
      status: '201',
    })
  })
})

app.delete('/:id',(req, res) => {
  const id = req.params.id;
  db.query(`DELETE list_item WHERE id = '${id}'`,(error, )=>{
    if (error) throw error;
    res.send({
      status: '201',
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})