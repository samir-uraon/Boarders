const nodemailer=require("nodemailer")
require("dotenv").config()

async function mailit(em,sub,mes){
try {
	
let sender=process.env.sendermail
let ep=process.env.pass


let mailserver=nodemailer.createTransport({
host:"smtp.gmail.com",
port:587,
auth:{
	user:sender,
	pass:ep
}


})




mailserver.sendMail({
	from:sender,
	to:em,
	subject:sub,
html:mes
})

//console.log("sendit");
} catch (error) {
	console.log("error");
	
}


}





async function mailit21(em,name,linkurl,amail,aname){
try {
	
let sender=process.env.sendermail
let ep=process.env.pass


let mailserver=nodemailer.createTransport({
host:"smtp.gmail.com",
port:587,
auth:{
	user:sender,
	pass:ep
}
})

mailserver.sendMail({
	from:sender,
	to:em,
	subject:"Admin Access Granted",
html:mes21(name,linkurl,aname,amail)
})

} catch (error) {
	console.log("error");
	
}
}




const mes21=(name,link,aname,amail)=>{
    return `
    <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Admin Access Granted</title>
  </head>
  <body style="font-family: Arial, sans-serif; color: #333;">
    <div style="max-width: 600px; margin: auto; padding: 20px;">
      <h2>Admin Access Granted</h2>
      <p>Hi ${name},</p>
      <p>
        You've been granted admin access to <strong>JUSL Boy's Hostel Boarders Website</strong>.
      </p>
      <p>Click the button below to log in and get started Within 1 hour :</p>

      <p style="text-align: center; margin: 30px 0;">
        <a href=${link} style="
          background-color: #007bff;
          color: #ffffff;
          padding: 12px 20px;
          text-decoration: none;
          border-radius: 5px;
          display: inline-block;
          font-weight: bold;
        ">Access Admin Panel</a>
      </p>

      <p>If you have any questions or need help, feel free to reach out.</p>

      <p>Welcome aboard!</p>

      <p>
        Best regards,<br />
        Old Admin - <strong>${aname}</strong><br />
    
        Old Admin's Email - <a href="mailto:${amail}">admin.email@gmail.com</a>
      </p>
    </div>
  </body>
</html>

    
    `
}




async function mailit22(em,mes){
try {
	
let sender=process.env.sendermail
let ep=process.env.pass


let mailserver=nodemailer.createTransport({
host:"smtp.gmail.com",
port:587,
auth:{
	user:sender,
	pass:ep
}
})

mailserver.sendMail({
	from:sender,
	to:em,
	subject:"Admin Access Confirmed",
html:mes
})

} catch (error) {
	console.log("error");
	
}
}

const forgetpasswordemailforadmin=(nam,pasw)=>{
let mes=`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Password Reset</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">

  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 8px;">
    <tr>
      <td>
        <h2 style="color: #333;">🔐 Forget Password</h2>
        <p>Hello ${nam},</p>
        <p>You requested a password reset. Here is your password:</p>

        <div style="background-color: #f0f0f0; padding: 15px; border: 1px dashed #ccc; font-size: 18px; text-align: center; margin: 20px 0;">
          <strong>${pasw}</strong>
        </div>

        <p style="color: #666;">Please copy this password and use it to <a href=${process.env.page_url}admin>LogIn </a> . </p>

  

        <p style="margin-top: 30px;">If you didn't request this reset, please ignore this email or contact support.</p>

        <p>Thanks,<br>The JUSL Boy's Admins Team</p>
      </td>
    </tr>
  </table>

</body>
</html>
`

return mes
}



const mes22=(name,email,link,aname,amail,pasw)=>{
  let mes=
  
    `
    <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Admin Access Confirmed</title>
  </head>
  <body style="font-family: Arial, sans-serif; color: #333;">
    <div style="max-width: 600px; margin: auto; padding: 20px;">
      <h2>Welcome, Admin Access Confirmed</h2>
      <p>Hi ${name},</p>

      <p>
        Your admin role has been activated for <strong>JUSL Hostel Boarders Website</strong>.
      </p>

      <p>Use the credentials below to log in:</p>

      <p>
        <strong>Email:</strong> ${email}<br />
        <strong>Password:</strong> ${pasw}
      </p>

      <p><strong>Please do not share your password .</strong></p>

      <p style="text-align: center; margin: 30px 0;">
        <a href=${link} style="
          background-color: #28a745;
          color: #ffffff;
          padding: 12px 20px;
          text-decoration: none;
          border-radius: 5px;
          display: inline-block;
          font-weight: bold;
        ">Login to Admin Panel</a>
      </p>

      <p>If you have any issues accessing your account, contact us for support.</p>

      <p>
        Best regards,<br />
        Old Admin - <strong>${aname}</strong><br />
    
        Old Admin's Email - <a href="mailto:${amail}">admin.email@gmail.com</a>
      </p>
    </div>
  </body>
</html>

    `
    return mes
}



const emailvemailsend=(username,link)=>{
	let emailvmail=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email</title>
</head>
<body style="font-family: sans-serif; margin: 0; padding: 0;">

    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse;">
        <tr>
            <td style="padding: 20px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
                    <tr>
                        <td style="padding-bottom: 20px;">
                            <h1 style="font-size: 24px; color: #333;">Verify Your Email</h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-bottom: 20px;">
                            <p>Hi ${username},</p>
                            <p>Thank you for signing up! Please click the button below to verify your email address and complete your registration.</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table align="center" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                                <tr>
                                    <td style="background-color: #007bff; color: #fff; padding: 1px 5px; border-radius: 5px;">
                                        <a href=${link} style="cursor:pointer;text-decoration: none; color: #fff; font-size:15px; display: inline-block; padding: 8px 10px;">Verify Email</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-top: 20px;">
                            <p>If the button doesn't work, you can copy and paste this link into your browser: <a href=${link} style="text-decoration: none; color: #007bff;">${link}</a></p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-top: 20px; font-size: 12px; color: #777;">
                            &copy; JUSLHostel - 2025
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>

</body>
</html>`

return emailvmail
}


const profilevemsend=(data,link1,link2,link3)=>{

let emailsend=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify</title>
</head>
<body style="font-family: monospace; margin: 0; padding: 0;">

    <ul>
        <li>profile : ${data.profile}</li>
        <li>name : ${data.name}</li>
        <li>email : ${data.email}</li>
        <li>dept : ${data.dept}</li>
        <li>passing year : ${data.passingyear}</li>
        <li>home : ${data.home}</li>
        <li>roomno : ${data.roomno}</li>
        <li>coords : ${data.coords}</li>
    </ul>
    <a href=${link1} style="margin:7px 4px 1px 30px;color:white;text-decoration:none;cursor:pointer;"><button style="cursor:pointer;background-color: rgb(19, 206, 12);border:none;border-radius:5px;padding:5px 10px;color:white;">Verify</button></a>
<a href=${link2} style="margin:1px 4px;color:white;text-decoration:none;cursor:pointer;"><button style="cursor:pointer;background-color: rgb(224, 217, 5);border:none;border-radius:5px;padding:5px 10px;color:black;">Not Verify</button></a>
<a href=${link3} style="margin:1px 4px;color:white;text-decoration:none;cursor:pointer;"><button style="cursor:pointer;background-color: rgb(224, 5, 12);border:none;border-radius:5px;padding:5px 10px;color:white;">Delete</button></a>

</body>
</html>`



	return emailsend
}

const forgetpasswordemail=(data)=>{
let mes=`<!DOCTYPE html>
<html>
<head>
  <title>Forgot Password</title>
</head>
<body style="font-family: sans-serif; margin: 0; padding: 0;color:black">
  <p>Hi ${data.name.split(" ")[0]},</p>
  <p>We received a request to reset your password for your account.</p>
  <p>To reset your password, please click the link below:</p>
<table align="center" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                                <tr>
                                    <td style="background-color: #007bff; color: #fff; padding: 1px 5px; border-radius: 5px;">
                                        <a href=${data.link} style="cursor:pointer;text-decoration: none; color: #fff; font-size:15px; display: inline-block; padding: 8px 10px;">Reset Password</a>
                                    </td>
                                </tr>
                            </table>
  <p>This link will expire in 1 hours.</p>
  <p>If you did not request a password reset, please ignore this email.</p>
<p>If the button doesn't work, you can copy and paste this link into your browser: <a href=${data.link} style="text-decoration: none; color: #007bff;">${data.link}</a></p>

</body>
</html>`

return mes
}





module.exports={mailit,mailit21,emailvemailsend,profilevemsend,forgetpasswordemail,forgetpasswordemailforadmin,mailit22,mes22}