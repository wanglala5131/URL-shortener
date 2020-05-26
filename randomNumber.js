function randomNumber() {
  const numberLength = 5
  let number = ""
  const letter = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"
  for (let i = 0; i < numberLength; i++) {
    number += letter[Math.floor(Math.random() * letter.length)]
  }

  return number
}

console.log(randomNumber())
module.exports = randomNumber