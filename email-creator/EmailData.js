class EmailData{
    constructor(tipoAgendamento, nomePaciente, numeroPaciente, especialidade, medico, diaHora, primeiraVez){
        this.tipoAgendamento = tipoAgendamento
        this.nomePaciente = nomePaciente
        this.numeroPaciente = numeroPaciente
        this.especialidade = especialidade
        this.medico = medico
        this.diaHora = diaHora
        this.primeiraVez = primeiraVez
    }
}

module.exports = EmailData