"use strict"
import express from "express"
import ServerlessHttp from "serverless-http"
import bodyParser from "body-parser"

const app = express()
const router = express.Router()

app.use(bodyParser.json())
app.use("/.netlify/functions/server", router)
app.use("/", router)

router.get("/", (req, res)=> {
    res.writeHead(200, {"Content-Type": "text/html"})
    res.write("<h1>Up and running </h1>")
    res.end()
})


router.post("/doSomethind", async(req, res)=> {
try{
    const airtable_api = 'https://api.airtable.com/v0/appzLdIRMrSF1cK9O/NFC%20Staff?maxRecords=3&view=Grid%20view'
    const bearer = 'Bearer ' + process.env.API_SECRET
    const response = await fetch(airtable_api, {
        method: 'GET',
        headers: {
            'Authorization': bearer
        }  
    })
    const data = await response.json()
    res.status(200).send({data: "success"})
}catch(err){
    console.log(err)
    res.status(400).send({error: "bad request"})
}
    
})

export default app
export const handler = serverless(app)
