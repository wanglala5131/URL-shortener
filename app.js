const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const PORT = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index')
})
app.post('/', (req, res) => {
  res.render('result')
})

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})