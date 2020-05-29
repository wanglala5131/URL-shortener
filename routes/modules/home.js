const express = require('express')
const router = express.Router()

const Url = require('../../models/url')
const randomNumber = require('../../randomNumber')
const PORT = process.env.PORT || 3000
const INDEX_URL = 'https://hidden-caverns-24251.herokuapp.com'  //記得不要加最後面的/
//const INDEX_URL = `http://localhost:${PORT}`

router.get('/', (req, res) => {
  res.render('index')
})
router.post('/', (req, res) => {
  const url = req.body.url
  if (url.includes('http://') || url.includes('https://')) {
    if (url.includes(INDEX_URL)) {
      const message = '請勿輸入此網頁或已被縮短的網頁'
      res.render('index', { message, url })
    } else {
      Url.findOne({ originalUrl: url })    //Url.find()  
        .lean()
        .then(existUrl => {
          //助教建議，用迴圈的話，若資料太多效能會變差，建議修改
          // for (let i = 0; i < existUrl.length; i++) {  //check資料庫中是否有資料
          //   if (existUrl[i].originalUrl === url) {
          //     return res.render('result', { shortUrl: existUrl[i].shortUrl, INDEX_URL })
          //   }
          // }
          if (existUrl) {   //如果有資料庫有符合就return
            return res.render('result', { shortUrl: existUrl.shortUrl, INDEX_URL })
          }
          let shortUrl = randomNumber()   //資料庫沒有符合就新增資料庫
          Url.create({
            originalUrl: url,
            shortUrl: shortUrl
          })
          return res.render('result', { shortUrl, INDEX_URL })
        })
        .catch(err => console.log(err))
    }

  } else {
    const message = '請輸入有效網址'
    res.render('index', { message, url })
  }
})

router.get('/:currentUrl', (req, res) => {
  const { currentUrl } = req.params
  Url.find()
    .lean()
    .then(existUrl => {
      for (let i = 0; i < existUrl.length; i++) {  //check資料庫中是否有資料
        if (existUrl[i].shortUrl === currentUrl) {
          return res.redirect(existUrl[i].originalUrl)
        }
      }
      return res.render('error')
    })
    .catch(err => console.log(err))
})

module.exports = router