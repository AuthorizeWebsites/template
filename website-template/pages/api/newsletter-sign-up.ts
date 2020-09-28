import { NextApiRequest, NextApiResponse } from "next";
// @ts-ignore :: can't be bothered to figure out what's fucked here
import mailchimp from "@mailchimp/mailchimp_marketing";

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_API_KEY.split("-")[1],
});

export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await mailchimp.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID, {
      email_address: req.body.email,
      status: "subscribed",
      merge_fields: {
        FNAME: req.body.firstName,
        LNAME: req.body.lastName,
      },
    });
    res.send("OK");
  } catch (err) {
    console.error(JSON.parse(err.response.text));
    res
      .status(err.response.status)
      .send(JSON.stringify(JSON.parse(err.response.text), null, 2));
  }
}
