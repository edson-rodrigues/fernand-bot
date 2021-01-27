const nodemailer = require('nodemailer')

let fromMail = 'edson.rodgon@gmail.com';
let toMail = 'suporte.saudebelem@gmail.com';
let subject = 'Agendamento Chatbot';

exports.text = (data) =>{
    return(`
        Solicitação de Agendamento via Whatsapp:\n\n
        Nome: ${data.nomePaciente}\n
        Número: ${data.numeroPaciente}\n
        Especialidade: ${data.especialidade}\n
        Médico: ${data.medico}\n
        Data/Hora: ${data.diaHora}\n\n
        Paciente de primeira vez: ${data.primeiraVez}\n\n
        Email enviado pela Fernanda, a atendente virtual da CSB! `      
        )
}

exports.transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: fromMail ,
        pass: 'jonsnowistheking'
    }
    });

// email options
exports.mailOptions = {
    from: fromMail,
    to: toMail,
    subject: subject,
    //needs a text property
    };

    






        



