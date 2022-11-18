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
});

export const userRouter = mergeRouters(
  loggedInUserRouter,
  router({
    public: publicUserRouter,
  })
);
