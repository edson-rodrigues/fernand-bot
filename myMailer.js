const nodemailer = require('nodemailer')

let fromMail = 'fernanda-bot@saudebelem.com.br';
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

/*exports.transporter = nodemailer.createTransport({
    service: '',
    auth: {
        user: fromMail ,
        pass: 'jonsnowistheking'
    }
    });*/

    exports.transporter = nodemailer.createTransport({
        host: "mail.saudebelem.com.br",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: fromMail, // generated ethereal user
          pass: '(FYR_wr)dXAX' // generated ethereal password
        },
      });

// email options
exports.mailOptions = {
    from: fromMail,
    to: toMail,
    subject: subject,
    //needs a text property
    };

    






        



