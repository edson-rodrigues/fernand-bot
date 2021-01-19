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
