import nodemailer from 'nodemailer'

const from = '"Bookworm"  <info@bookworm.com>'

function setup() {
    return nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "5f625fb9d2fdde",
          pass: "24126d02b8b732"
        }
      });
}

export function sendConfirmationEmail(user) {
    const transport = setup()
    
    const email = {
        from,
        to: user.email,
        subject: 'Welcome to Bookworm',
        text: `
        Welcome to Bookworm. Please, confirm your email.
            ${user.generateConfirmationUrl()}
        `
    }
    transport.sendMail(email)
}

export function sendResetPasswordEmail(user) {
    const transport = setup()
    
    const email = {
        from,
        to: user.email,
        subject: 'Reset Password',
        text: `
        To reset password follow this link
            ${user.generateResetPasswordLink()}
        `
    }
    
    transport.sendMail(email)   
}