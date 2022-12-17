import { resizeBase64Image } from "@/lib/resizeBase64Image";
import { type RouterOutputs } from "@/utils/trpc";
import { type Prisma } from "@prisma/client";
import { z } from "zod";
import {
  publicProcedure,
  protectedProcedure,
  router,
  mergeRouters,
} from "../trpc";

// @INFO: Things unauthenticated users can query about themselves.
const publicUserRouter = router({
  session: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
});

// @INFO: Things authenticated users can query about themselves.
const loggedInUserRouter = router({
  me: protectedProcedure.query(async ({ ctx }) => {
    const { user } = ctx;
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      plan: user.plan,
      role: user.role,
      bio: user.bio,
      createdAt: user.createdAt,
    };
  }),
  getMylistings: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.listing.findMany({
      where: {
        userId: ctx.user.id,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  }),
  updateProfile: protectedProcedure
    .input(
      z.object({
        avatar: z.string().optional(),
        bio: z.string().optional(),
        email: z.string().optional(),
        name: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const data: Prisma.UserUpdateInput = { ...input };

      if (input.avatar) {
        data.avatar = await resizeBase64Image(input.avatar);
      }

      await ctx.prisma.user.update({
        where: {
          id: ctx.user.id,
        },
        data,
      });
    }),
});

export const userRouter = mergeRouters(
  loggedInUserRouter,
  router({
    public: publicUserRouter,
  })
);

export type UserMeOutput = RouterOutputs["user"]["me"];
