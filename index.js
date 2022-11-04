var nodemailer = require('nodemailer');
const fs = require('fs');
require('dotenv').config();

let to = false;
let subject = false;
let content = false;
let template = false;

const args = process.argv.slice(2);

if(args.length != 3){
  file_name = process.argv[1].split('\\').at(-1);
  console.log(`Usage: node ${file_name} [to] [subject] [content]`);
  process.exit(1);
}else{
  to = args[0];
  subject = args[1];
  content = args[2];
}

try{
  template = fs.readFileSync(content, 'utf8');
  console.log(`Using file: ${content}`);
}catch(err){
  console.log('Using input string.');
}

var transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.PORT,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

var mailOptions = {
  from: process.env.FROM,
  to: to,
  subject: subject,
  html : template ? template : content
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});