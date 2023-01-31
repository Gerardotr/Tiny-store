import nodemailer from 'nodemailer';
export const sendEmailWithNodemailer = async () => {
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: 'hans54@ethereal.email',
            pass: 'Y1rM6EJdSheFea1msX',
        },
    });
    await transporter.sendMail({
        from: 'geratobe3@gmail.com',
        to: "geratobe@gmail.com",
        subject: "Hello ✔",
        text: "Hello world?",
        html: "<b>Hello world?</b>"
    });


}