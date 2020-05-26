const Url = require('../url')
const urlList = require('./url.json').results
const db = require('../../config/mongoose')

db.once('open', async () => {
  urlList.map((url) => {
    console.log(url)
    return Url.create(url)
  })
  console.log('done')
})
