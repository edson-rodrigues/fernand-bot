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
    intentMap.set("1 - Terça-Feira - Clínico Geral", handlers.TercaClinicoGeralHandler)
    intentMap.set("2 - Quinta-Feira - Clínico Geral", handlers.QuintaClinicoGeralHandler)
    intentMap.set("1 - Primeira Vez", handlers.PrimeiraVezHandler)
    intentMap.set("1 - Primeira Vez - fallback", handlers.PrimeiraVezFallbackHandler)
    intentMap.set("2 - Já é paciente da clínica", handlers.JaPacienteHandler)
    intentMap.set("2 - Já é paciente da clínica - fallback", handlers.JapacienteFallbackHandler)
    intentMap.set("Verificar Nome Paciente", handlers.VerificarNomePacienteHandler)
    intentMap.set("Reverificar Nome Paciente", handlers.ReverificarNomePacienteHandler)
    intentMap.set("Nome Paciente Correto", handlers.NomePacienteCorretoHandler)
    intentMap.set("Nome Paciente Errado", handlers.NomePacienteErradoHandler)
    intentMap.set("Solicitar Número de Telefone", handlers.VerificarNumeroPaciente)
    intentMap.set("Confirma Agendamento", handlers.ConfirmarAgendamentoHandler)
    intentMap.set("Finalizar Conversa", handlers.FinalizaConversaHandler)
    

    agent.handleRequest(intentMap)
}