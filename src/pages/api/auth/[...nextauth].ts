import NextAuth, { type NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import InstagramProvider from "next-auth/providers/instagram";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import { env } from "../../../env/server.mjs";
import nodemailer, { type TransportOptions } from "nodemailer";
import { smtpConfig } from "@/lib/smtpConfig";
import { html, text } from "@/lib/emailTemplate";

const transporter = nodemailer.createTransport<TransportOptions>(
  smtpConfig.transport as TransportOptions
);

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: env.FACEBOOK_CLIENT_ID,
      clientSecret: env.FACEBOOK_CLIENT_SECRET,
    }),
    InstagramProvider({
      clientId: env.INSTAGRAM_CLIENT_ID,
      clientSecret: env.INSTAGRAM_CLIENT_SECRET,
    }),
    EmailProvider({
      type: "email",
      // @INFO: Magic links are valid for 10 minutes.
      maxAge: 10 * 60 * 60,
      sendVerificationRequest: ({ identifier, url, theme }) => {
        const { host } = new URL(url);
        transporter.sendMail({
          from: `${env.EMAIL_FROM}` || "ntornos.com",
          to: identifier,
          subject: "Your sign-in link for ntornos.com",
          text: text({ url, host }),
          html: html({ url, host, theme }),
        });
      },
    }),
  ],
  // pages: {
  //   signIn: "/auth/signin",
  // },
};

export default NextAuth(authOptions);
