import type { User_role } from "@prisma/client";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  type DefaultSessionUser = NonNullable<DefaultSession["user"]>;
  type NtornosSessionUser = DefaultSessionUser & {
    id: number;
    role: User_role;
    avatar?: string;
  };
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  interface Session {
    user: NtornosSessionUser;
  }
}
