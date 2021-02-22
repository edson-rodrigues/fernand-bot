const agendaMedicos = require('./agendaMedicos.json')
const precos = require('./precosExames.json')
const mailer = require('../myMailer')

const corpoEmail = {}

const requerido = () => "Atenção, para a realização deste procedimento, é necessário uma solicitação médica. Caso você tenha, pode continuar com seu agendamento normalmente, caso não, responda *Cancelar* e agende uma consulta com nossos médicos que podem solicitar esse procedimento\n"

const verificarSePrimeiraVez = () =>{
    return('Para prosseguir com seu agendamento, por favor, nos informe se você já se consultou na \
    clínica anteriormente ou se é a sua primeira vez com a gente:\
         \n1 - Primeira Vez\
         \n2  - Já me consultei na clínica anteriormente')
}

exports.EncerraConversaHandler = function(agent){
    agent.add("A Clínica Saúde Belém agradece seu contato! Conte com a gente!")
}

exports.ApresentacaoHandler = function(agent){
    agent.add("Olá, eu sou a Fernanda, a atendente virtual da Clínica Saúde Belém. \
Por favor, digite o número correspondente a opção desejada:\n\n \
1 - Agendar uma consulta\n \
2 - Agendar um exame\n \
3 - Consultar o valor de um exame ou consulta\n \
4 - Encerrar" 
    )
}

exports.AgendarConsultaHandler = function(agent){
    
    agent.add(`Certo, você quer agendar uma consulta. Por favor, digite o número correspondente\
    a especialidade que deseja consultar:\
    \n1 - Clínico Geral\
    \n2 - Dermatologista\
    \n3 - Gastroenterologista\
    \n4 - Ginecologista\
    \n5 - Pneumologista\
    \n6 - Endocrinologista\
    \n7 - Alergologista\
    \n8 - Urologista
    \n9 - Cardiologista\
    \n10 - Oftalmologista\
    \n11 - Otorrinolaringologista\
    \n12 - Psiquiatra\
    \n13 - Nefrologista\
    \n14 - Neurologista\
    \n15 - Ortopedista\
    \n16 - Mastologista\
    \n17 - Pediata`
    )
    corpoEmail.tipoAgendamento = "Agendamento de Consulta"
}

exports.AgendarClinicoGeralHandler = function(agent){
    agent.add(`Certo, na especialidade de *Clínico Geral*, temos o Dr. *Igor Mizael*, que atende na
    *Terça-Feira à partir das 8h* e na *Quinta-Feira à partir das 7:30h* O preço da consulta é
    R$ 105,00 no cartão de débito ou crédito em até 3x, com desconto para pagamento em dinheiro, fica R$ 80,00. Em qual dia desejas agendar?
    \n1 - Terça-Feira, à partir das 8h
    \n2 - Quinta-Feira, à partir das 7:30h`)
    corpoEmail.especialidade = "Clínico Geral"
    corpoEmail.medico = "Dr. Igor Mizael"
}
exports.TercaClinicoGeralHandler = function(agent){
    agent.add(verificarSePrimeiraVez)
     corpoEmail.diaHora = "Terça-feira a partir das 8h"
}

exports.QuintaClinicoGeralHandler = function(agent){
    agent.add(verificarSePrimeiraVez)
     corpoEmail.diaHora = "Quinta-feira a partir das 8h"
}

exports.PrimeiraVezHandler = function(agent){
    agent.add("É sua primeira vez com a gente. Agora, por favor, nos informe seu nome completo")
    corpoEmail.primeiraVez = "Sim"
}

exports.PrimeiraVezFallbackHandler = function(agent){
    agent.add("Não entendi o que você digitou, por favor, insira novamente seu nome completo (sem abreviações)")
}
exports.JaPacienteHandler = function(agent){
    agent.add("Você já é nosso paciente, agradecemos a fidelidade. Agora, por favor, nos informe seu nome completo")
    corpoEmail.primeiraVez = "Não"
}

exports.JaPacienteFallbackHandler = function(agent){
    agent.add("Não entendi o que você digitou, por favor, insira novamente seu nome completo (sem abreviações)")
    corpoEmail.primeiraVez = "Não"
}

exports.VerificarNomePacienteHandler = function(agent){
    const nomePaciente = agent.parameters.person.name
    agent.add(`O seu nome é: ${nomePaciente}?\
    \n1 - Sim\
     \n2 - Não`)
    corpoEmail.nomePaciente = nomePaciente 
}

exports.ReverificarNomePacienteHandler = function(agent){
    const nomePaciente = agent.parameters.name
    agent.add(`O seu nome é: ${nomePaciente}?\
    \n1 - Sim\
     \n2 - Não`)
    corpoEmail.nomePaciente = nomePaciente 
}

exports.NomePacienteCorretoHandler = function(agent){
    agent.add(`Certo, ${corpoEmail.nomePaciente}. Agora por favor, nos informe seu celular para\
     contato (mesmo que seja este que estás utilizando agora), informe apenas números:`
  )
}

exports.NomePacienteErradoHandler = function(agent){
    agent.add(`Certo, por favor, nos informe seu nome novamente, não use abreviações ou insira outras informações além do nome:`
  )
}

exports.VerificarNumeroPaciente = function(agent){
    let numero = agent.parameters.number
    agent.add(`Confirma que seu número de telefone para contato é ${numero}?
    1 - Sim
    2 - Não`)
    corpoEmail.numeroPaciente = String(numero)
}
exports.ConfirmarAgendamentoHandler = function (agent){
    agent.add(`${corpoEmail.nomePaciente}, confirma seu agendamento para o(a) próximo(a)
    ${corpoEmail.diaHora} na especialidade de ${corpoEmail.especialidade} com o(a) ${corpoEmail.medico}?
     1 - Sim
     2 - Cancelar
     ` )
}
/*
 *
 O CORPO DO EMAIL É MONTADO AQUI 
 * 
 */
exports.FinalizaConversaHandler = function(agent){
    agent.add("Sua solicitação de agendamento foi realizada com sucesso! Em breve estaremos entrando\
    em contato com você para confirmar o agendamento e passar instruções. A Clínica Saúde Belém agradece a sua preferência\
, tenha um bom dia!")
    mailer.mailOptions.text = mailer.text(corpoEmail)
    mailer.transporter.sendMail(mailer.mailOptions, (error, response) => {
        if (error) {
            console.log(error);
        }
        console.log(response)
        });

}
//AGENDAMENTOS DERMATO
exports.AgendarDermatoHandler = function(agent){
    agent.add(`Certo. O preço da consulta é R$ 140,00 em no cartão de crédito em até 3x ou débito. Para pagamento em dinheiro, há desconto, ficando em R$ 110,00 Na especialidade de dermatologista, contamos com as seguintes profissionais:
    1 - Dra. Marion Drago. Que atende na ${agendaMedicos.medicos[1].horarios[0]} e na ${agendaMedicos.medicos[1].horarios[1]}. Somente particular.
    2 - Dra. Cassia Camarinha. Que atende na ${agendaMedicos.medicos[2].horarios[0]}. Somente particular.
    3 - Dra. Paula Cerqueira. Que atende de segunda-feira à sábado com hora marcada. *Profissional recomendado para procedimentos estéticos*
    
    Por favor, digite o número correspondente a opção desejada.
    
    `)
    corpoEmail.especialidade = "Dermatologista"
}
exports.AgendarMarionHandler = function(agent){
    agent.add(`Entendi. Você deseja se consultar com a Dra. Marion. Agora por favor, selecione o dia que deseja se consultar:
    1 - ${agendaMedicos.medicos[1].horarios[0]}
    2 - ${agendaMedicos.medicos[1].horarios[1]}`)
    corpoEmail.medico = "Dra. Marion Drago"
}
exports.MarionSegundaHandler = function(agent){
    agent.add(verificarSePrimeiraVez())
    corpoEmail.diaHora = agendaMedicos.medicos[1].horarios[0]
}
exports.MarionQuintaHandler = function(agent){
    agent.add(verificarSePrimeiraVez())
    corpoEmail.diaHora = agendaMedicos.medicos[1].horarios[1]
}
exports.AgendarCassiaHandler = function(agent){
    agent.add(verificarSePrimeiraVez())
    corpoEmail.medico = "Dra. Cassia Camarinha"
    corpoEmail.diaHora = agendaMedicos.medicos[2].horarios[0]
}
exports.AgendarPaulaHandler = function(agent){
    agent.add(agendaMedicos.medicos[3].horarios[0])
}

//GASTRO
exports.AgendarGastroHandler = function(agent){
    agent.add(`Na especialidade de Gastroenterologista, temos o Dr. Allan Rodrigues. Que atende na ${agendaMedicos.medicos[4].horarios[0]}. O preço da consulta é R$ 125,00 no cartão de crédito em até 3x, ou débito. Para pagamento em dinheiro, há desconto e o valor fica R$ 100,00. Gostaria de Agendar?
    1 - Agendar
    2 - Cancelar`)
}
exports.ConfirmaGastroHandler = function(agent){
    agent.add(verificarSePrimeiraVez())
    corpoEmail.especialidade = "Gastroenterologista"
    corpoEmail.medico = "Dr. Allan Rodrigues"
    corpoEmail.diaHora = agendaMedicos.medicos[4].horarios[0]     
}
//GINECO
exports.AgendarGinecoHandler = function(agent){
    agent.add(`
    O preço da consulta é R$ 125,00 no cartão de crédito em até 3x, ou débito. Para pagamento em dinheiro, há desconto, ficando no valor de R$ 100,00
    Certo, na especialidade de Ginecologista, temos:\n
    1 - Dra. Cecília Pinho, que atende na ${agendaMedicos.medicos[5].horarios[0]}\n
    2 - Dra. Debora Queiroz, que atende na ${agendaMedicos.medicos[6].horarios[0]}\n
    3 - Dra. Lara Orlandini, que atende na ${agendaMedicos.medicos[7].horarios[0]}\n
    4 - Dra. Tayssa Guimarães, que atende na ${agendaMedicos.medicos[8].horarios[0]}\n
    Por favor responda com o número corresponde a profissional desejada.`)
    corpoEmail.especialidade = "Ginecologista"
}
exports.AgendarCeciliaHandler = function(agent){
    agent.add(`Certo. Você deseja se consultar com a Dra. Cecília.\n
    ${verificarSePrimeiraVez()}`)
    corpoEmail.medico = "Dra. Cecília Pinho"
    corpoEmail.diaHora = agendaMedicos.medicos[5].horarios[0]
}
exports.AgendarDeboraHandler = function(agent){
    agent.add(`Certo. Você deseja se consultar com a Dra. Debora Queiroz.\n
    ${verificarSePrimeiraVez()}`)
    corpoEmail.medico = "Dra. Debora Queiroz"
    corpoEmail.diaHora = agendaMedicos.medicos[6].horarios[0]
}
exports.AgendarLaraHandler = function(agent){
    agent.add(`Certo. Você deseja se consultar com a Dra. Lara.\n
    ${verificarSePrimeiraVez()}`)
    corpoEmail.medico = "Dra. Lara Orlandini"
    corpoEmail.diaHora = agendaMedicos.medicos[7].horarios[0]
}
exports.AgendarTayssaHandler = function(agent){
    agent.add(`Certo. Você deseja se consultar com a Dra. Tayssa.\n
    ${verificarSePrimeiraVez()}`)
    corpoEmail.medico = "Dra. Tayssa Guimarães"
    corpoEmail.diaHora = agendaMedicos.medicos[8].horarios[0]
}
//PNEUMO
exports.AgendarPneumoHandler = function(agent){
    agent.add(`
    O preço da consulta nessa especialidade é R$ 180,00 no cartão de crédito em até 3x, ou débito. Pagamento em dinheiro há desconto, ficando no valor de R$ 140,00.
    Na especialidade de Pneumologista, Temos o Dr. Waldocir Santa Rosa. Por favor, responda\
    com o número correspondente ao dia que deseja agendar.
    1 - ${agendaMedicos.medicos[9].horarios[0]}
    2 - ${agendaMedicos.medicos[9].horarios[1]}`)
    corpoEmail.medico = "Dr. Waldocir Santa Rosa"
    corpoEmail.especialidade = "Pneumologista"
}
exports.AgendarWaldocirTercaHandler = function(agent){
    agent.add(verificarSePrimeiraVez())
    corpoEmail.diaHora = agendaMedicos.medicos[9].horarios[0]
}
exports.AgendarWaldocirSabadoHandler = function(agent){
    agent.add(verificarSePrimeiraVez())
    corpoEmail.diaHora = agendaMedicos.medicos[9].horarios[1]
}
//ENDOCRINO
exports.AgendarEndocrinoHandler = function(agent){
    agent.add(`
    O preço da consulta nessa especialidade é R$ 140,00 para crédito em até 3x, ou débito. Para pagamento em dinheiro, há desconto, ficando no valor de R$ 110,00. Na especialidade de Endocrinologista, temos a Dra. Dyndyher de Sá, \
que atende na ${agendaMedicos.medicos[10].horarios[0]} e na ${agendaMedicos.medicos[10].horarios[1]}
e a Dra. Fabíola Bastos que atende na ${agendaMedicos.medicos[11].horarios[0]}\n
Por favor, responda com o número correspondente a opção que deseja:
1 - Agendar com a Dra. Dyndyher
2 - Agendar com a Dra. Fabíola`)
    corpoEmail.especialidade = "Endocrinologista"
}
exports.AgendarDyndyherHandler = function(agent){
    agent.add(`Entendi. Você deseja se consultar com a Dra. Dyndyher, por favor, selecione o dia que deseja se consultar:
    1 - ${agendaMedicos.medicos[10].horarios[0]}
    2 - ${agendaMedicos.medicos[10].horarios[1]}
    `)
    corpoEmail.medico = "Dra. Dyndyher"
}
exports.AgendarDyndyherQuartaHandler = function(agent){
    agent.add(verificarSePrimeiraVez())
    corpoEmail.diaHora = agendaMedicos.medicos[10].horarios[0]
}
exports.AgendarDyndyherSextaHandler = function(agent){
    agent.add(verificarSePrimeiraVez())
    corpoEmail.diaHora = agendaMedicos.medicos[10].horarios[1]
}
exports.AgendarFabiolaHandler = function(agent){
    agent.add(verificarSePrimeiraVez())
    corpoEmail.medico = "Dra. Fabiola"
    corpoEmail.diaHora = agendaMedicos.medicos[11].horarios[0]
}

//ALERGO
exports.AgendarAlergoHandler = function(agent){
    agent.add(`
    O preço da consulta nessa especialidade é de R$ 140,00 no crédito em até 3x, ou débito. Para pagamento em dinheiro, há desconto, ficando no valor de R$ 110,00.
    Na especialidade de Alergista/Alergologista temos a Dra. Bárbara Teixeira, que atende na
    ${agendaMedicos.medicos[12].horarios[0]} e a Dra. Carolina Tavares, que atende na ${agendaMedicos.medicos[13].horarios[0]}
    \nPor favor, responda com o número correspondente a opção desejada:\n
    1 - Dra. Bárbara Teixeira\n
    2 - Dra. Carolina Tavares`)
    corpoEmail.especialidade = "Alergista / Alergologista"
}
exports.AgendarBarbaraHandler = function(agent){
    agent.add(verificarSePrimeiraVez())
    corpoEmail.medico = "Dra. Bárbara Teixeira"
    corpoEmail.diaHora = agendaMedicos.medicos[12].horarios[0]
}
exports.AgendarCarolinaHandler = function(agent){
    agent.add(verificarSePrimeiraVez())
    corpoEmail.medico = "Dra. Carolina Tavares"
    corpoEmail.diaHora = agendaMedicos.medicos[13].horarios[0]
}
//URO
exports.AgendarUroHandler = function(agent){
    agent.add(`
    O preço da consulta nessa especialidade é R$ 125,00 no cartão de crédito em até 3x, ou débito. Para pagamento em dinheiro, há desconto, ficando no valor de R$ 100,00.
    Na especialidade de Urologia, temos o Dr. Marcus Vilaça, que atende na ${agendaMedicos.medicos[14].horarios[0]}
    e o Dr. Marcus Queiroz, que atende na ${agendaMedicos.medicos[15].horarios[0]}\n
    por favor, responda com o número correspondente a opção desejada:\n
    1 - Dr. Marcus Vilaça\n
    2 - Dr. Marcus Queiroz\n`)
    corpoEmail.especialidade = "Urologista"
}
exports.AgendarVilacaHandler = function(agent){
    agent.add(verificarSePrimeiraVez)
    corpoEmail.medico = "Dr. Marcus Vilaça"
    corpoEmail.dia = agendaMedicos.medicos[14].horarios[0]
}
exports.AgendarQueirozHandler = function(agent){
    agent.add(verificarSePrimeiraVez)
    corpoEmail.medico = "Dr. Marcus Queiroz"
    corpoEmail.dia = agendaMedicos.medicos[15].horarios[0]
}

//CARDIO
exports.AgendarCardioHandler = function(agent){
    agent.add(`
    Nessa especialidade, o valor da consulta é R$ 125,00 no cartão de crédito em até 3x, ou débito. Para pagamento em dinheiro, há desconto, ficando no valor de R$ 100,00
    Na especialidade de cardiologista, temos o Dr. Artur Batista, que atende na ${agendaMedicos.medicos[16].horarios[0]} e a Dra. Gessica Pinheiro, que atende na ${agendaMedicos.medicos[17].horarios[0]}`)
    corpoEmail.especialidade = "Cardiologista"
}
exports.AgendarArturHandler = function(agent){
    agent.add(verificarSePrimeiraVez()
    )
    corpoEmail.medico = "Dr. Artur Batista"
    corpoEmail.diaHora = agendaMedicos.medicos[16].horarios[0]
}
exports.AgendarGessicaHandler = function(agent){
    agent.add(verificarSePrimeiraVez()
    )
    corpoEmail.medico = "Dra. Gessica Pinheiro"
    corpoEmail.diaHora = agendaMedicos.medicos[17].horarios[0]
}

//OFTALMO
exports.AgendarOftalmoHandler = function(agent){
    agent.add(`
    O preço da consulta nessa especialidade é de R$ 140,00 no crédito em até 3x, ou débito. Para pagamento em dinheiro, há desconto, ficando no valor de R$ 110,00.
    Na especialidade de oftalmologista, temos o Dr. Augusto Almeida, que atende na ${agendaMedicos.medicos[18].horarios[0]} e na ${agendaMedicos.medicos[18].horarios[1]}, e a Dra. Ana Carla, que atende na ${agendaMedicos.medicos[19].horarios[0]}\
    Por favor, responda com o número correspondente a opção desejada:\n
    1 - Agendar Dr. Augusto\n
    2 - Agendar Dra. Ana Carla`)
    corpoEmail.especialidade = "Oftalmologista"
}
exports.AgendarAugustoHandler = function(agent){
    agent.add(`Você selecionou o Dr. Agusto Almeida. Agora por favor, responda com o número correspondente ao dia que deja agendar:\n
    1 - ${agendaMedicos.medicos[18].horarios[0]}\n
    2 - ${agendaMedicos.medicos[18].horarios[1]}`)
    corpoEmail.medico = "Dr. Augusto Almeida"
}
exports.AgendarAugustoTercaHandler = function(agent){
    agent.add(verificarSePrimeiraVez())
    corpoEmail.diaHora = agendaMedicos.medicos[18].horarios[0]
}
exports.AgendarAugustoQuintaHandler = function(agent){
    agent.add(verificarSePrimeiraVez())
    corpoEmail.diaHora = agendaMedicos.medicos[18].horarios[1]
}
exports.AgendarAnaCarlaHandler = function(agent){
    agent.add(verificarSePrimeiraVez())
    corpoEmail.medico = "Ana Carla"
    corpoEmail.diaHora = agendaMedicos.medicos[19].horarios[0]
}
//OTORRINO
exports.AgendarOtorrinoHandler = function(agent){
    agent.add(`
    O preço da consulta nessa especialidade é R$ 125,00 no cartão de crédito em até 3x, ou débito. Para pagamento em dinheiro, há desconto, ficando no valor de R$ 100,00.
    Na especialidade de Otorrinolaringologista, temos o Dr. Vicente de Paula, que atende ${agendaMedicos.medicos[20].horarios[0]}, ${agendaMedicos.medicos[20].horarios[1]} e ${agendaMedicos.medicos[20].horarios[1]} a partir das 10:30h
    Por favor, responda com o número correspondente ao dia que deseja se consultar:
    \n1 - ${agendaMedicos.medicos[20].horarios[0]}
    \n2 - ${agendaMedicos.medicos[20].horarios[1]}
    \n3 - ${agendaMedicos.medicos[20].horarios[2]}`)
    corpoEmail.especialidade = "Otorrinolaringologista"
    corpoEmail.medico = "Dr. Vicente de Paula"
}
exports.AgendarVicenteSegundaHandler = function(agent){
    agent.add(verificarSePrimeiraVez())
    corpoEmail.diaHora = agendaMedicos.medicos[20].horarios[0]
}
exports.AgendarVicenteQuartaHandler = function(agent){
    agent.add(verificarSePrimeiraVez())
    corpoEmail.diaHora = agendaMedicos.medicos[20].horarios[1]
}
exports.AgendarVicenteSextaHandler = function(agent){
    agent.add(verificarSePrimeiraVez())
    corpoEmail.diaHora = agendaMedicos.medicos[20].horarios[2]
}

//PSIQUIATRA
exports.AgendarPsiquiatraHandler = function(agent){
    agent.add(`
    O preço da consulta nessa especialidade é R$300,00 no cartão de crédito em até 3x, ou débito. Para pagamento em dinheiro, há desconto, ficando no valor de R$ 250,00.
    Na especialidade de Psiquiatra, temos a Dra. Regiane Farias, que atende na ${agendaMedicos.medicos[21].horarios[0]} e na ${agendaMedicos.medicos[21].horarios[1]}
    à partir das 10:30h. Responda com o número correspondente a data que deseja agendar:
    1 - ${agendaMedicos.medicos[21].horarios[0]}
    2 - ${agendaMedicos.medicos[21].horarios[1]}`)
    corpoEmail.especialidade = 'Psiquiatra'
    corpoEmail.medico = "Regiane Farias"
}
exports.AgendarRegianeTercaHandler = function(agent){
    agent.add(verificarSePrimeiraVez())
    corpoEmail.diaHora = agendaMedicos.medicos[21].horarios[0]
}
exports.AgendarRegianeQuintaHandler = function(agent){
    agent.add(verificarSePrimeiraVez())
    corpoEmail.diaHora = agendaMedicos.medicos[21].horarios[1]
}
//NEFRO
exports.AgendarNefroHandler = function(agent){
    agent.add(`
    O preço da consulta nessa especialidade é R$ 140,00 no cartão de crédito em até 3x, ou débito. Para pagamento em dinheiro, há desconto, ficando no valor de R$ 110,00.
    Na especialidade de Nefrologista, temos o Dr. Pedro Paulo, que atende na ${agendaMedicos.medicos[22].horarios[0]}.
    Gostaria de Agendar?
    1 - Sim
    2 - Cancelar
    Responda com o número correspondente a opção desejada.
    `)
}
exports.AgendarPedroPauloHandler = function(agent){
    agent.add(verificarSePrimeiraVez())
    corpoEmail.especialidade = "Nefrologista"
    corpoEmail.medico = "Dr. Pedro Paulo"
    corpoEmail.diaHora = agendaMedicos.medicos[22].horarios[0]
}
//NEURO
exports.AgendarNeuroHandler = function(agent){
    agent.add(`Na especialidade de Neurologista, temos o Dr. José Roberto, que atende na ${agendaMedicos.medicos[23].horarios[0]}
    Deseja agendar? Responda com o número correspondente a opção desejada.
    1 - Agendar
    2 - Cancelar`)
}
exports.AgendarJoseRobertoHandler = function(agent){
    agent.add(verificarSePrimeiraVez())
    corpoEmail.especialidade = "Neurologista"
    corpoEmail.medico = "Dr. José Roberto"
    corpoEmail.diaHora = agendaMedicos.medicos[23].horarios[0]
}
//ORTO
exports.AgendarOrtopedistaHandler = function(agent){
    agent.add(`
    O preço da consulta nessa especialidade é de R$ 125,00 em até 3x no cartão de crédito, ou débito. Para pagamento em dinheiro, há desconto, ficando no valor de R$ 100,00.
    Na especialidade de Ortopedista, temos a Dra. Jurema Miguins, que atende na ${agendaMedicos.medicos[24].horarios[0]}.
    Gostaria de agendar? Responda com o número correspondente a opção desejada.
    1 - Agendar
    2 - Cancelar`)
}
exports.AgendarJuremaHandler = function(agent){
    agent.add(verificarSePrimeiraVez())
    corpoEmail.especialidade = "Ortopedista"
    corpoEmail.medico = "Dra. Jurema Miguins"
    corpoEmail.diaHora = agendaMedicos.medicos[24].horarios[0]
}
//MASTO
exports.AgendarMastoHandler = function(agent){
    agent.add(`
    O preço da consulta nessa especialidade é de R$ 140,00 no cartão de crédito em até 3x, ou débito. Para pagamento em dinheiro, há desconto, ficando em R$ 110,00.
    Na especialidade de Mastologista, temos a Dra. Débora que atende na ${agendaMedicos.medicos[6].horarios[0]}
    e a Dra. Tayssa que atende na ${agendaMedicos.medicos[8].horarios[0]}. Por favor responda com o número correspondente a oção desejada:
    1 - Agendar Dra. Débora
    2 - Agendar Dra. Tayssa`)
    corpoEmail.especialidade = "Mastologista"
}
//PEDI
exports.AgendarPediHandler = function(agent){
    agent.add(`
    O preço da consulta é R$ 125,00 em até 3x no cartão de crédito, ou débito. Para pagamento em dinheiro, há desconto, ficando no valor de R$ 100,00.
    Na especialidade de Pediatria, temos a Dra. Lucy Anne, que atende na ${agendaMedicos.medicos[25].horarios[0]}. Deseja agendar?
    Responda com o número correspodente a opção desejada.
    1 - Agendar
    2 - Cancelar`)
    corpoEmail.especialidade = "Pediatra"
}
exports.AgendarLucyHandler = function(agent){
    agent.add(verificarSePrimeiraVez())
    corpoEmail.medico = "Dra. Lucy Anne"
    corpoEmail.diaHora = agendaMedicos.medicos[25].horarios[0]
}
/**
 * INICIO DAS INTENTS PARA EXAMES E PROCEDIMENTOS
 */
exports.AgendarExameHandler = function(agent){
    agent.add(
        `
            Certo, você deseja agendar um exame ou procedimento, para prosseguir, por favor, selecione a especialidade médica que realiza o exame que você deseja fazer:\n
            1 - Alergologia
            2 - Cardiologia
            3 - Endocrinologia
            4 - Gastroentrologia / Proctologia
            5 - Ginecologia
            6 - Oftalmologia
            7 - Otorrinolaringologia
            8 - Pneumologia
            9 - Dermatologia
            10 - Ultrassonografia
        `
    )
    corpoEmail.tipoAgendamento = "Agendamento de Procedimento/Exame"
}

exports.AgendarExameAlergoHandler = function(agent){
    agent.add(
        `Certo, na especialidade de alergologia, oferecemos os seguintes exames:
            1 - Imunoterapia
            2 - Teste de contato 1 bateria
            3 - Teste de contato 2 baterias
            4 - Teste cutâneo 8 substâncias
            5 - Teste cutâneo +8 substâncias
            6 - Teste de Provocação

        Por favor, responda com o número correspondente a opção desejada. Para encerrar o atendimento, digite 0.
        `
    )
    corpoEmail.especialidade = 'alergologia'
}

exports.SelecionaAlergoHandler = function(agent){
    agent.add(`
    Certo, agora vamos selecionar a médica que irá realizar seu exame. Por favor, responda 1 para agendar com a Dra. Bárbara, que atende na ${agendaMedicos.medicos[12].horarios[0]}, ou responda 2 para agendar com a Dra. Carolina, que atende na ${agendaMedicos.medicos[13].horarios[0]}.
    `)
    corpoEmail.especialidade = "Alergista/Alergologista"
}

exports.ImunoterapiaHandler = function(agent){
    agent.add(
        `
        ${requerido()}
        A Imunoterapia está no valor de ${precos.precos[0].preco[0]} no cartão em de crédito em até 3x, ou débito. Para pagamento em dinheiro, há desconto, ficando no valor de ${precos.precos[0].preco[1]}.
        Deseja prosseguir com seu agendamento? Responda com o número correspondente a opção desejada.
        1 - Sim
        2 - Cancelar
        `
    )
    corpoEmail.nomeExame = "Imunoterapia"
}

exports.TesteContato1Handler = function(agent){
    agent.add(
        requerido()
        `O teste de contato 1 bateria está no valor de ${precos.precos[1].preco[0]} no cartão em de crédito em até 3x, ou débito. Para pagamento em dinheiro, há desconto, ficando no valor de ${precos.precos[1].preco[1]}.`
    )
    corpoEmail.nomeExame = "Teste de Contato 1 Bateria"
}
exports.TesteContato2Handler = function(agent){
    agent.add(
        requerido()
        `O teste de contato 2 bateria está no valor de ${precos.precos[2].preco[0]} no cartão em de crédito em até 3x, ou débito. Para pagamento em dinheiro, há desconto, ficando no valor de ${precos.precos[2].preco[1]}.`
    )
    corpoEmail.nomeExame = "Teste de Contato 2 Baterias"
}






