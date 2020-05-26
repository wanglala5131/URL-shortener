const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Url = require('./models/url')
const randomNumber = require('./randomNumber.js')
const routes = require('./routes')

const app = express()
const PORT = 3000
require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)

// const INDEX_URL = `http://localhost:${PORT}/`

// app.get('/', (req, res) => {
//   res.render('index')
// })
// app.post('/', (req, res) => {
//   const url = req.body.url
//   if (url.includes('http://') || url.includes('https://')) {
//     if (url.includes(INDEX_URL)) {
//       const message = '請勿輸入此網頁或已被縮短的網頁'
//       res.render('index', { message, url })
//     } else {
//       Url.find()
//         .lean()
//         .then(existUrl => {
//           for (let i = 0; i < existUrl.length; i++) {  //check資料庫中是否有資料
//             if (existUrl[i].originalUrl === url) {
//               return res.render('result', { shortUrl: existUrl[i].shortUrl, INDEX_URL })
//             }
//           }
//           let shortUrl = randomNumber()
//           Url.create({
//             originalUrl: url,
//             shortUrl: shortUrl
//           })
//           return res.render('result', { shortUrl, INDEX_URL })
//         })
//         .catch(err => console.log(err))
//     }

//   } else {
//     const message = '請輸入有效網址'
//     res.render('index', { message, url })
//   }
// })

// app.get('/:currentUrl', (req, res) => {
//   const { currentUrl } = req.params
//   Url.find()
//     .lean()
//     .then(existUrl => {
//       for (let i = 0; i < existUrl.length; i++) {  //check資料庫中是否有資料
//         if (existUrl[i].shortUrl === currentUrl) {
//           return res.redirect(existUrl[i].originalUrl)
//         }
//       }
//       return res.render('error')
//     })
//     .catch(err => console.log(err))
// })

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})