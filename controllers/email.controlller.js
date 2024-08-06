import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

export const admissionMail = (req, res) => {
  const { name, gender, DOB, POB, number, email, fName, mName, pAddress, cAddress } = req.body;

  let config = {
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass:  process.env.GMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    }
  }
  let transporter = nodemailer.createTransport(config);

  let mailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'NoName technology',
      link: 'https://nonametech.info',
    },
  });

  let response = {
    body: {
      name: "N.S.N. COLLGE",
      intro: 'Someone is ready to send email to you',
      table: {
        data : [
          {
            Name: name,
            Gender: gender,
            DOB: DOB,
            POB: POB,
            Number: number,
            Email: email,
            FatherName: fName,
            MotherName: mName,
            PermanentAddress: pAddress,
            CurrentAddress: cAddress,
          }
        ]
      },
    // outro: 'Share your email with us',
    },
  }
  const sendmail = process.env.SENDMAIL;
  let mail = mailGenerator.generate(response);
  let message = {
    from: process.env.GMAIL_USER,
    to: sendmail,
    subject: 'Admission mail from nsn.ac.com',
    html: mail,
  }

  transporter.sendMail(message).then(() => {
    return res.json({
      message: 'Mail send successfully',
      success: true,
      status: 201,
    })
  })

};

export const contactUserMail = (req, res) => {
  const { name, email } = req.body;

  let config = {
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass:  process.env.GMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    }
  }
  let transporter = nodemailer.createTransport(config);

  let mailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'N.S.N. COLLEGE',
      link: 'https://nonametech.info',
    },
  });

  let response = {
    body: {
      name: name,
      intro: 'Thank you for reaching out to us at N.S.N. College of Enginnering and Technology. We appreciate your interest and are delighted to assist you.',
    outro: 'Please feel free to let us know if you have any further questions or require additional information. We look forward to connecting with you soon.',
    },
  }
  let mail = mailGenerator.generate(response);
  let message = {
    from: "dk9232525@gmail.com",
    to: email,
    subject: 'Form Submission',
    html: mail,
  }

  transporter.sendMail(message).then(() => {
    return res.json({
      message: 'Mail send successfully',
      success: true,
      status: 201,
    })
  })
};

export const contactMail = (req, res) => {
  const { name, email, msg } = req.body;
  let config = {
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass:  process.env.GMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    }
  };
  
  let transporter = nodemailer.createTransport(config);
    
  let mailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'N.S.N. COLLEGE',
      link: 'https://nonametech.info',
    },
  })
  
  let response = {
    body: {
      name: name,
      intro: 'Thank you for reaching out to us at N.S.N. College of Enginnering and Technology. We appreciate your interest and are delighted to assist you.',
      table: {
        data: [
          {
            Name: name,
            Email: email,
            Message: msg,
          }
        ]
      },
    outro: 'Please feel free to let us know if you have any further questions or require additional information. We look forward to connecting with you soon.',
    },
  
  }
  let mail = mailGenerator.generate(response);
  let message = {
    from: email,
    to: process.env.ADMIN_EMAIL,
    subject: 'New Message from Contact Form',
    html: mail,
  }
  
  transporter.sendMail(message).then(() => {
    return res.json({
      message: 'Mail send successfully',
      success: true,
      status: 201,
    })
  })
};