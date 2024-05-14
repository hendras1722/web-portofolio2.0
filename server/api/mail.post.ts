import nodemailer from 'nodemailer'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()
  const transporter = nodemailer.createTransport({
    // service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,

    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.NUXT_USERMAIL,
      pass: process.env.NUXT_PASSMAIL,
    },
  })

  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: `"${body.name}" <hendratitans@gmail.com>`, // sender address
      to: 'User <muhsyahendraa1722@gmail.com>', // list of receivers,
      replyTo: body.email,
      subject: body.subject, // Subject line
      text: body.message, // plain text body
    })

    console.log('Message sent: %s', info.messageId)
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }
  try {
    await main()

    return {
      data: true,
    }
  } catch (error) {
    return {
      data: false,
      error,
    }
  }
})
