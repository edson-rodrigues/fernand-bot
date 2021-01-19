const express = require('express')
const bodyParser = require('body-parser')
const {WebhookClient} = require('dialogflow-fulfillment')
const app = express()

app.use(bodyParser.json())

const port = process.env.PORT || 3000

app.post('/dialogflow-fulfillment', (request, response)=>{
    dialogflowFulfillment(request, response)
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

const dialogflowFulfillment = (request, response) =>{
    const agent = new WebhookClient({request, response})

    function sayHello(agent){
        agent.add("Hi there, this response is coming from Edson")
    }

    let intentMap = new Map()
    intentMap.set("Apresentacao", sayHello)
    agent.handleRequest(intentMap)
}