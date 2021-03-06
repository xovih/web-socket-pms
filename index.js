import dotenv from "dotenv"
import { Server } from "socket.io";

dotenv.config()
const PORT = process.env.PORT || 4502

const whiteList = [
  'http://192.168.197.234:4201',
  'http://192.168.196.196:4203',
  'http://192.168.206.179:4503',
  'http://pms-mu.pindad.co.id',
  'http://bn-pms.divmu.pindad.co.id',
  'http://pms.divmu.pindad.co.id'
]

const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Socket Client tidak diijinkan !!"))
    }
  }
}

const io = new Server({
  cors: corsOptions
})

io.on("connection", (socket) => {
  console.log("A user has connected !")

  socket.on("updateDashboard", (data) => {
    console.log("Data from user socket", data)
    io.emit("getDashboard", data)
  })

  socket.on("disconnect", () => {
    console.log("A user has left")
  })
})

io.listen(PORT)