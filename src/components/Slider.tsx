import * as SliderPrimitive from "@radix-ui/react-slider";
import { type ElementRef, forwardRef } from "react";

type SliderProps = React.ComponentPropsWithoutRef<
  typeof SliderPrimitive["Root"]
> & { label: string; value?: number[] };

const Slider = forwardRef<
  ElementRef<typeof SliderPrimitive["Root"]>,
  SliderProps
>(function Slider(props, forwardedRef) {
  const { label } = props;
  const value = props.value || props.defaultValue;

  return (
    <SliderPrimitive.Root
      className="relative mt-2 flex h-4 w-full touch-none select-none items-center"
      aria-label={label}
      ref={forwardedRef}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1 flex-grow rounded-md bg-neutral-200">
        <SliderPrimitive.Range className="absolute h-full rounded-full bg-indigo-600" />
      </SliderPrimitive.Track>
      {value?.map((_, idx) => (
        <SliderPrimitive.Thumb
          key={idx}
          className="block h-4 w-4 cursor-pointer rounded-full bg-indigo-500 transition-all hover:bg-indigo-600 focus:outline-none"
        />
      ))}
    </SliderPrimitive.Root>
  );
});

export default Slider;
