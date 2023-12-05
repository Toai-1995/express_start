import mysql  from 'mysql'
const connection = mysql.createConnection({
  host: '3.85.225.40',
  port: 3306,
  user: 'tom',
  password: '123456',
  database: 'todolist'
})

connection.connect()

export const db = connection