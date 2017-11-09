const nodemailer = require('nodemailer');
const QRCode = require('qrcode-svg')





module.exports = function mail(group,events) {
  console.log(events.location, '------------');
  const qrcode = new QRCode({
    content: "https://www.npmjs.com/package/qrcode-svg",
    padding: 4,
    width: 256,
    height: 256,
    color: "#000000",
    background: "#ffffff",
    ecl: "M"
  });
  qrcode.save("sample.svg", function(error) {
    if (error) throw error;
    console.log("Done!");
  });
  // Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing


    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'finalprojecthacktiv8@gmail.com', // generated ethereal user
            pass: 'projecthacktiv8'  // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: 'EventHub', // sender address
        to: 'azharieazharou@gmail.com', // list of receivers
        subject: `Invitasi ${events.Group.name_of_group} by ${events.name_of_event}`, // Subject line
         // plain text body
        html: `Hello Kamu di Undang di Event ${events.name_of_event}
              di Hari ${events.date}, ${events.location}`, // html body
        attachments : [
          {
            filename : 'sample.svg',
            path : './sample.svg',
            cid: 'dontlate@unique.com'
          }
        ]
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });

};
