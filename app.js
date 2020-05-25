const express = require('express')
const app = express()
const PORT = 3000

app.get('/', (req, res) => {
  res.send('123')
})

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})