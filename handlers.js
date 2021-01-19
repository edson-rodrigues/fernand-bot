const axios = require('axios')

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
    agent.add("Certo, você quer agendar uma consulta. Por favor, digite o número correspondente\
    a especialidade que deseja consultar:\
    \n\n1 - Clínico Geral\
    \n\n2 - Dermatologista\
    \n\n3 - Gastroenterologista\
    \n\n4 - Mais...")
}

exports.AgendarClinicoGeralHandler = function(agent){
    agent.add("Certo, na especialidade de *Clínica Médica*, temos o *Dr. Igor Mizael*, que atende na *Terça-Feira\
    à partir das 10h* e na *Quinta-Feira à partir das 10h* Em qual dia desejas agendar?\
    \n\n1 - Terça-Feira, à partir das 10h\
    \n\n2 - Quinta-Feira, à partir das 10h")
}

exports.TercaClinicoGeralHandler = function(agent){
    agent.add("Certo, para concluir seu agendamento, por favor, nos informe se você já se consultou na\
     clínica anteriormente ou se é a sua primeira vez com a gente:\
     \n\n1 - Primeira Vez\
     \n\n2  - Já me consultei na clínica anteriormente")
}
exports.PrimeiraVezHandler = function(agent){
    agent.add("É sua primeira vez com a gente. Agora, por favor, nos informe seu nome completo")
}
exports.VerificarNomePacienteHandler = function(agent){
    let nomePaciente = agent.parameters.person.name
    agent.add(`O seu nome é: ${nomePaciente}?\
    \n\n1 - Sim\
    \n\n2 - Não`)
    return nomePaciente
}
exports.NomePacienteCorretoHandler = function(agent){
    agent.add(`Certo, ${VerificarNomePacienteHandler}. Você confirma seu agendamento de consulta para a terça-feira,\
     10h com o Clínico Geral Dr. Igor Mizael?\
     \n\n1 - Sim\
     \n\n2 - Cancelar`)
}
exports.ConfirmarAgendamentoHandler = function(agent){
    agent.add("Sua solicitação de  agendamento foi realizada com sucesso! Em breve estaremos entrando\
     em contato com você para confirmar o agendamento. A Clínica Saúde Belém agradece a sua preferência\
     , tenha um bom dia!")
}
