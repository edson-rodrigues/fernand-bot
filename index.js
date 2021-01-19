const express = require('express')
const bodyParser = require('body-parser')
const {WebhookClient} = require('dialogflow-fulfillment')
const handlers = require('./handlers')

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
    let intentMap = new Map()
    intentMap.set("Apresentacao", handlers.ApresentacaoHandler)
    intentMap.set("1 - Agendar Consulta", handlers.AgendarConsultaHandler)
    intentMap.set("1 - Clínico Geral", handlers.AgendarClinicoGeralHandler)
    intentMap.set("1 - Terça-Feira 10h - Clínico Geral", handlers.TercaClinicoGeralHandler)
    intentMap.set("1 - Primeira Vez", handlers.PrimeiraVezHandler)
    intentMap.set("Verificar Nome Paciente", handlers.VerificarNomePacienteHandler)
    intentMap.set("Nome Paciente Correto", handlers.NomePacienteCorretoHandler)
    intentMap.set("Confirmar Agendamento", handlers.ConfirmarAgendamentoHandler)

    agent.handleRequest(intentMap)
}