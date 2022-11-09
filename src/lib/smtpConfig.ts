import SendmailTransport from "nodemailer/lib/sendmail-transport";
import SMTPConnection from "nodemailer/lib/smtp-connection";
import { env } from "@/env/server.mjs";

function detectTransport():
  | SendmailTransport.Options
  | SMTPConnection.Options
  | string {
  if (process.env.EMAIL_SERVER) {
    process.env.EMAIL_SERVER;
  }

  if (env.EMAIL_SERVER_HOST) {
    const port = parseInt(env.EMAIL_SERVER_USER);
    const transport = {
      host: env.EMAIL_SERVER_HOST,
      port,
      auth: {
        user: env.EMAIL_SERVER_USER,
        pass: env.EMAIL_SERVER_PASSWORD,
      },
      secure: port === 465,
      tls: {
        rejectUnauthorized: env.NODE_ENV === "development" ? false : true,
      },
    };
    return transport;
  }

  return {
    sendmail: true,
    newline: "unix",
    path: "/usr/sbin/sendmail",
  };
}

export const smtpConfig = {
  transport: detectTransport(),
  from: env.EMAIL_FROM,
};
