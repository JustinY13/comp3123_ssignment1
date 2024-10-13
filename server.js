
const express = require("express")
const usersRoutes = require("./routes/users")
const employeeRoutes = require("./routes/employee")
const mongoose = require("mongoose")

const DB_CONNECTION_STRING = "mongodb+srv://justinyeh13:GBC13gbc!@cluster0.ifuyg.mongodb.net/comp3123_assignment1?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB")
}).catch((err) => {
    console.log("Error: ", err)
})


const app = express()

const SERVER_PORT = 3005

app.use(express.json())
app.use(express.urlencoded())

app.use(express.urlencoded({extended: true}));

app.use("/api/v1", usersRoutes)
app.use("/api/v1", employeeRoutes)

app.route("/")
    .get((req, res) => {
        res.send("<h1>MongoDB + Mongoose Example</h1>")
    })

    
// Error Handler
const errorHandler = (err, req, res, next) => {
    res.status(500).send({status: false, message: err.message});
}
app.use(errorHandler);

app.listen(SERVER_PORT, () =>{
    console.log(`Server running at http://localhost:${SERVER_PORT}/`)
})
