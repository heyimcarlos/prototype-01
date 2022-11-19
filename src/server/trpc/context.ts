import { type inferAsyncReturnType, type Maybe } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { type Session } from "next-auth";
import { type GetServerSidePropsContext } from "next";

import { getLocaleFromHeaders } from "@/lib/i18n";
import { defaultAvatarSrc } from "@/lib/profile";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import { prisma } from "../db/client";

type CreateContextOptions =
  | CreateNextContextOptions
  | GetServerSidePropsContext;

async function getUserFromSession({
  session,
  req,
}: {
  session: Maybe<Session>;
  req: CreateContextOptions["req"];
}) {
  if (!session?.user?.id) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
      locale: true,
      bio: true,
      plan: true,
      role: true,
      createdAt: true,
    },
  });

  if (!user) {
    return null;
  }
  const { email } = user;
  if (!email) {
    return null;
  }
  console.log("user after email sign up: ", user);
  const avatar = user.avatar || defaultAvatarSrc({ email });
  console.log("user avatar: ", avatar);
  const locale = user.locale || getLocaleFromHeaders(req);
  console.log("locale hello? ", locale);
  return {
    ...user,
    avatar,
    email,
    locale,
  };
}

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async ({ req, res }: CreateContextOptions) => {
  // Get the session from the server using the unstable_getServerSession wrapper function
  console.log("Create context function is firing");
  const session = await getServerAuthSession({ req, res });
  const user = await getUserFromSession({ session, req });
  const locale = user?.locale ?? getLocaleFromHeaders(req);
  console.log("locale", locale);

  return {
    session,
    prisma,
    user,
    // locale,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
