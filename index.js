const express = require('express')
const bodyParser = require('body-parser')
const {WebhookClient} = require('dialogflow-fulfillment')
const handlers = require('./handlers/handlers')

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
    intentMap.set("Encerrar Conversa", handlers.EncerraConversaHandler)
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
    intentMap.set("Confirmar Agendamento", handlers.ConfirmarAgendamentoHandler)
    intentMap.set("Finalizar Conversa", handlers.FinalizaConversaHandler)
    
    intentMap.set("2 - Dermatologista", handlers.AgendarDermatoHandler)
    intentMap.set("1 - Agendar Marion", handlers.AgendarMarionHandler)
    intentMap.set('1 - Segunda Marion', handlers.MarionSegundaHandler)
    intentMap.set('2 - Quinta Marion', handlers.MarionQuintaHandler)
    intentMap.set('2 - Agendar Cassia', handlers.AgendarCassiaHandler)
    intentMap.set('3 - Agendar Paula', handlers.AgendarPaulaHandler)
    
    //Gastro
    intentMap.set('3 - Agendar Gastro', handlers.AgendarGastroHandler)
    intentMap.set('1 - Confirma Gastro', handlers.ConfirmaGastroHandler)

    //Gineco
    intentMap.set('4 - Agendar Gineco', handlers.AgendarGinecoHandler)
    intentMap.set('1 - Agendar Cecília', handlers.AgendarCeciliaHandler)
    intentMap.set('2 - Agendar Gineco Debora', handlers.AgendarDeboraHandler)
    intentMap.set('3 - Agendar Lara', handlers.AgendarLaraHandler)
    intentMap.set('4 - Agendar Gineco Tayssa', handlers.AgendarTayssaHandler)

    //Pneumo
    intentMap.set('5 - Agendar Pneumo', handlers.AgendarPneumoHandler)
    intentMap.set('1 - Agendar Waldocir Terça', handlers.AgendarWaldocirTercaHandler)
    intentMap.set('2 - Agendar Waldocir Sábado', handlers.AgendarWaldocirSabadoHandler)

    //Endocrino
    intentMap.set('6 - Agendar Endocrino', handlers.AgendarEndocrinoHandler)
    intentMap.set('1 - Agendar Dyndyher', handlers.AgendarDyndyherHandler)
    intentMap.set('1 - Agendar Dyndyher Quarta', handlers.AgendarDyndyherQuartaHandler)
    intentMap.set('2 - Agendar Dyndyher Sexta', handlers.AgendarDyndyherSextaHandler)
    intentMap.set('2 - Agendar Fabiola', handlers.AgendarFabiolaHandler)

    
    //Alergo
    intentMap.set('7 - Agendar Alergo', handlers.AgendarAlergoHandler)
    intentMap.set('1 - Agendar Bárbara', handlers.AgendarBarbaraHandler)
    intentMap.set('2 - Agendar Carolina', handlers.AgendarCarolinaHandler)

    //Uro
    intentMap.set('8 - Agendar Uro', handlers.AgendarUroHandler)
    intentMap.set('1 - Agendar Vilaça', handlers.AgendarVilacaHandler)
    intentMap.set('2 - Agendar Queiroz', handlers.AgendarQueirozHandler)

    //Cardio
    intentMap.set('9 - Agendar Cardio', handlers.AgendarCardioHandler)
    intentMap.set('1 - Agendar Artur', handlers.AgendarArturHandler)
    intentMap.set('2 - Agendar Gessica', handlers.AgendarGessicaHandler)

    //Oftalmo
    intentMap.set('10 - Agendar Oftalmo', handlers.AgendarOftalmoHandler)
    intentMap.set('1 - Agendar Augusto', handlers.AgendarAugustoHandler)
    intentMap.set('1 - Agendar Augusto Terça', handlers.AgendarAugustoTercaHandler)
    intentMap.set('2 - Agendar Augusto Quinta', handlers.AgendarAugustoQuintaHandler)
    intentMap.set('2 - Agendar Ana Carla', handlers.AgendarAnaCarlaHandler)

    //Otorrino
    intentMap.set('11 - Agendar Otorrino', handlers.AgendarOtorrinoHandler)
    intentMap.set('1 - Agendar Vicente Segunda', handlers.AgendarVicenteSegundaHandler)
    intentMap.set('2 - Agendar Vicente Quarta', handlers.AgendarVicenteQuartaHandler)
    intentMap.set('3 - Agendar Vicente Sexta', handlers.AgendarVicenteSextaHandler)

    //Psiquiatra
    intentMap.set('12 - Agendar Psiquiatra', handlers.AgendarPsiquiatraHandler)
    intentMap.set('1 - Agendar Regiane Terça', handlers.AgendarRegianeTercaHandler)
    intentMap.set('2 - Agendar Regiane Quinta', handlers.AgendarRegianeQuintaHandler)

    //Nefro
    intentMap.set('13 - Agendar Nefro', handlers.AgendarNefroHandler)
    intentMap.set('1 - Agendar Pedro Paulo', handlers.AgendarPedroPauloHandler)
    
    //Neuro
    intentMap.set('14 - Agendar Neuro', handlers.AgendarNeuroHandler)
    intentMap.set('1 - Agendar José Roberto', handlers.AgendarJoseRobertoHandler)

    //Orto
    intentMap.set('15 - Agendar Orto', handlers.AgendarOrtopedistaHandler)
    intentMap.set('1 - Agendar Jurema', handlers.AgendarJuremaHandler)

    //Masto
    intentMap.set('16 - Agendar Masto', handlers.AgendarMastoHandler)
    //os intents pra agendar para as dras débora e tayssa são os mesmos intents de gineco, pois é a mesma agenda
    
    //Pedi
    intentMap.set('17 - Agendar Pedi', handlers.AgendarPediHandler)
    intentMap.set('1 - Agendar Lucy', handlers.AgendarLucyHandler)

    //##########INTENTS PARA EXAMES ###############

    intentMap.set('2 - Agendar Exame ou Procedimento', handlers.AgendarExameHandler)

    intentMap.set('Pergunta Nome Exame', handlers.PerguntaNomeExameHandler)
    
    //EXAMES ALERGO
    intentMap.set('1 - Exames Alergo', handlers.AgendarExameAlergoHandler)
    intentMap.set('1 - Imunoterapia', handlers.ImunoterapiaHandler)
    intentMap.set('2 - Teste de Contato 1 Bateria', handlers.TesteContato1Handler)
    intentMap.set('3 - Teste de Contato 2 Baterias', handlers.TesteContato2Handler)
    intentMap.set('4 - Teste Cutâneo 8 Substâncias', handlers.TesteCutaneo8Handler)
    intentMap.set('5 - Teste Cutâneo + 8 Substâncias', handlers.TesteCutaneoMais8Handler)
    intentMap.set('6 - Teste de Provocação', handlers.TesteProvocacaoHandler)

    intentMap.set('Seleciona Alergo', handlers.SelecionaAlergoHandler)

    //EXAMES CARDIO
    intentMap.set('2 - Exames Cardio', handlers.AgendarExameCardioHandler)
    intentMap.set('1 - Agendar Eco Adulto', handlers.AgendarEcoAdultoHandler)
    intentMap.set('2 - Agendar Eco Fetal', handlers.AgendarEcoFetalHandler)
    intentMap.set('3 - Agendar Eletro', handlers.AgendarEletroHandler)
    intentMap.set('4 - Agendar Holter', handlers.AgendarHolterHandler)
    intentMap.set('5 - Agendar Mapa', handlers.AgendarMapaHandler)
    intentMap.set('6 - Agendar TE', handlers.AgendarTEHandler)

    //EXAMES ENDOCRINO
    intentMap.set('3 - Exames Endocrino')


    
    
    agent.handleRequest(intentMap)
}   