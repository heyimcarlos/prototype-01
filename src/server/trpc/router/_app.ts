import { router } from "../trpc";
import { listingRouter } from "./listing";
import { mapRouter } from "./map";
import { userRouter } from "./user";

export const appRouter = router({
  map: mapRouter,
  user: userRouter,
  listing: listingRouter
});

export type AppRouter = typeof appRouter;
