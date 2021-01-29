const mailer = require('./myMailer')

const corpoEmail = {}

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
    \n4 - Mais...`)
    corpoEmail.tipoAgendamento = "consulta"
}

exports.AgendarClinicoGeralHandler = function(agent){
    agent.add(`Certo, na especialidade de *Clínico Geral*, temos o *Igor Mizael*, que atende na
    *Terça-Feira à partir das 8h* e na *Quinta-Feira à partir das 7:30h* Em qual dia desejas agendar?
    \n1 - Terça-Feira, à partir das 8h
    \n2 - Quinta-Feira, à partir das 7:30h`)
    corpoEmail.especialidade = "Clínico Geral"
    corpoEmail.medico = "Dr. Igor Mizael"
}
exports.TercaClinicoGeralHandler = function(agent){
    agent.add("Certo, para prosseguir com seu agendamento, por favor, nos informe se você já se consultou na \
clínica anteriormente ou se é a sua primeira vez com a gente:\
     \n1 - Primeira Vez\
     \n2  - Já me consultei na clínica anteriormente")
     corpoEmail.diaHora = "Terça-feira a partir das 8h"
}

exports.QuintaClinicoGeralHandler = function(agent){
    agent.add("Certo, para prosseguir com seu agendamento, por favor, nos informe se você já se consultou na \
clínica anteriormente ou se é a sua primeira vez com a gente:\
     \n1 - Primeira Vez\
     \n2  - Já me consultei na clínica anteriormente")
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


