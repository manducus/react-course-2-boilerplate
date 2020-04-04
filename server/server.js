// live-server や webpack dev-server のような多機能な server は production には不向き
// もっとシンプルなもので十分 -> express を使う

const path = require("path")
const express = require("express")
const app = express() // create an express application
const publicPath = path.join(__dirname, "..", "public")
const port = process.env.PORT || 3000 // heroku が用意したPORTがあればそれを使い、なければ3000

app.use(express.static(publicPath)) // tell express to use public directory

app.get("*" , (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"))
})
// app.get() - setup function to run when someone makes a request to server)
// "*" - path to match all unmatched routes
// req - contains info about the request
// res - let us manipulate the response our express server makes to whoever made the HTTP request
// sendFile - send the file back

app.listen(port, () => {
  console.log("Server is up!")
})
// port 3000 は development purposes に使われる
// second argument は サーバーが立ち上がったときに呼ばれる関数