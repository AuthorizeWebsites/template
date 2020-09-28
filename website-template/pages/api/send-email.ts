import { NextApiRequest, NextApiResponse } from "next";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await sgMail.send({
      to: process.env.SUBMISSIONS_EMAIL,
      from: "forms@authorizewebsites.com",
      subject: `Your website has a form submission.`,
      html: /*html*/ `
        <h3>The following message was submitted via your website's ${req.body.formName} form.</h3>
        <pre>email: ${req.body.email}</pre>
        <pre>${req.body.message}</pre>
    `,
    });
    res.send("OK");
  } catch (err) {
    console.error(err);
    res.status(400).send(err.toString());
  }
}
