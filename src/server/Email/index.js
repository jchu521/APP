const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.REACT_APP_SENDGRID_API);

module.exports.verifyAccountEmail = (id, hash, email) => {
  const msg = {
    to: "jonathanchueh1992@gmail.com",
    from: "app@example.com",
    subject: "Welcome to App",
    html: `<strong>Thanks for signing up!</strong>
          <br /> <p>Your account has been created, you can login with the following credentials after you have activated your account by pressing the url below.</p>
          <br /> <a href="http://localhost:3000/verifyEmail/${id}?h=${hash}" target="_"><input type="button" value="Verify Email" /></a>`
  };
  sgMail.send(msg);
};

//http://localhost:3000/verifyEmail?u=5dce74eb2da59a2f70983c8f&h=82807358-9438-4702-b67a-4ee5cd9d0bb6
