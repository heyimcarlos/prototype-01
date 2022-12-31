type GetSSRResult<TProps> =
  | { props: TProps }
  | { redirect: { destination: string; permanent: boolean } }
  | { notFound: boolean };

type GetSSRFn<TProps> = (...args: never[]) => Promise<GetSSRResult<TProps>>;

export type inferSSRProps<TFn extends GetSSRFn<unknown>> = TFn extends GetSSRFn<
  infer TProps
>
  ? NonNullable<TProps>
  : never;
