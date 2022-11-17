// src/server/router/context.ts
import { getLocaleFromHeaders } from "@/lib/i18n";
import { defaultAvatarSrc } from "@/lib/profile";
import * as trpc from "@trpc/server";
import type { Maybe } from "@trpc/server";
import type * as trpcNext from "@trpc/server/adapters/next";
import type { GetServerSidePropsContext } from "next";
import type { Session } from "next-auth";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import { prisma } from "../db/client";

type CreateContextOpts =
  | trpcNext.CreateNextContextOptions
  | GetServerSidePropsContext;

async function getUserFromSession({
  session,
  req,
}: {
  session: Maybe<Session>;
  req: CreateContextOpts["req"];
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
    },
  });

  if (!user) {
    return null;
  }
  const { email } = user;
  if (!email) {
    return null;
  }
  const avatar = user.avatar || defaultAvatarSrc({ email });
  const locale = user.locale || getLocaleFromHeaders(req);

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
export const createContext = async (opts: CreateContextOpts) => {
  const { req, res } = opts;

  // Get the session from the server using the unstable_getServerSession wrapper function
  const session = await getServerAuthSession({ req, res });
  const user = await getUserFromSession({ session, req });
  const locale = user?.locale ?? getLocaleFromHeaders(req);

  return {
    session,
    prisma,
    user,
    locale,
  };
};

type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const createRouter = () => trpc.router<Context>();
