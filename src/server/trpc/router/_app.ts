import { router } from "../trpc";
import { mapRouter } from "./map";
import { userRouter } from "./user";

export const appRouter = router({
  map: mapRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
