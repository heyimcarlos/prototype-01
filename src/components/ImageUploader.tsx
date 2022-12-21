import { type FormEvent, useCallback, useEffect, useState } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import * as Dialog from "@radix-ui/react-dialog";
import Cropper from "react-easy-crop";
import { useFileReader } from "@/hooks/useFileReader";

type Area = {
  width: number;
  height: number;
  x: number;
  y: number;
};

const MAX_IMAGE_SIZE = 512;

type ImageUploaderProps = {
  id: string;
  buttonMsg: string;
  handleAvatarChange: (imgSrc: string) => void;
  imageSrc?: string;
  target: string;
};

export interface FileEvent<T = Element> extends FormEvent<T> {
  target: EventTarget & T;
}

// This is separate to prevent loading the component until file upload
function CropContainer({
  onCropComplete,
  imageSrc,
}: {
  imageSrc: string;
  onCropComplete: (croppedAreaPixels: Area) => void;
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const handleZoomSliderChange = (value: number) => {
    value < 1 ? setZoom(1) : setZoom(value);
  };

  return (
    <div className="crop-container h-40 max-h-40 w-40 rounded-full">
      <div className="relative h-40 w-40 rounded-full">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onCropComplete={(_, croppedAreaPixels) => onCropComplete(croppedAreaPixels)}
          onZoomChange={setZoom}
        />
      </div>
      <Slider
        value={zoom}
        min={1}
        max={3}
        step={0.1}
        label={"Slide to adjust cropped selection"}
        changeHandler={handleZoomSliderChange}
      />
    </div>
  );
}

export default function ImageUploader({
  target,
  id,
  buttonMsg,
  handleAvatarChange,
  ...props
}: ImageUploaderProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const [{ result }, setFile] = useFileReader({
    method: "readAsDataURL",
  });

  useEffect(() => {
    if (props.imageSrc) {
      setImageSrc(props.imageSrc);
    }
  }, [props.imageSrc]);

  const onInputFile = (e: FileEvent<HTMLInputElement>) => {
    if (!e.target.files?.length || !e.target.files[0]) {
      return;
    }
    setFile(e.target.files[0]);
  };

  const showCroppedImage = useCallback(
    async (croppedAreaPixels: Area | null) => {
      try {
        if (!croppedAreaPixels) return;
        const croppedImage = await getCroppedImg(result as string, croppedAreaPixels);
        setImageSrc(croppedImage);
        handleAvatarChange(croppedImage);
      } catch (e) {
        console.error(e);
      }
    },
    [result, handleAvatarChange]
  );

  return (
    <Dialog.Root onOpenChange={(opened) => !opened && setFile(null)}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {buttonMsg}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black opacity-50 fixed inset-0" />
        <Dialog.Content className="bg-white rounded-md fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[90vw] max-w-[450px] max-h-[85vh] p-6 focus:outline-none">
          <div className="sm:flex sm:items-start">
            <div className="text-center sm:mt-0 sm:text-left">
              <h3 className="text-lg leading-6 text-gray-900" id="modal-title">
                Upload avatar
              </h3>
            </div>
          </div>
          <div className="mb-4">
            <div className="cropper mt-6 flex flex-col items-center justify-center p-8">
              {!result && (
                <div className="flex h-20 max-h-20 w-20 items-center justify-start rounded-full bg-gray-50">
                  {!imageSrc && (
                    <p className="w-full text-center text-sm text-white sm:text-xs">
                      upload, target when no imageSrc
                    </p>
                  )}
                  {imageSrc && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img className="h-20 w-20 rounded-full" src={imageSrc} alt={target} />
                  )}
                </div>
              )}
              {result && (
                <CropContainer imageSrc={result as string} onCropComplete={setCroppedAreaPixels} />
              )}
              {/*dark settings: dark:border-gray-800 dark:bg-transparent dark:text-white dark:hover:bg-gray-900*/}
              <label className="cursor-pointer mt-8 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                <input
                  onInput={onInputFile}
                  type="file"
                  name={id}
                  placeholder={"Upload image"}
                  className="pointer-events-none absolute mt-4 opacity-0"
                  accept="image/*"
                />
                choose a file...
              </label>
            </div>
          </div>
          <div className="mt-5 flex flex-row-reverse gap-x-2 sm:mt-4">
            <Dialog.Close asChild>
              <button
                type="button"
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => showCroppedImage(croppedAreaPixels)}
              >
                Save
              </button>
            </Dialog.Close>

            <Dialog.Close asChild>
              <button
                type="button"
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => showCroppedImage(croppedAreaPixels)}
              >
                Cancel
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

const createImage = (url: string) => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });
};

async function getCroppedImg(imageSrc: string, pixelCrop: Area): Promise<string> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Context is null, this should never happen");

  const maxSize = Math.max(image.naturalWidth, image.naturalHeight);
  const resizeRatio = MAX_IMAGE_SIZE / maxSize < 1 ? Math.max(MAX_IMAGE_SIZE / maxSize, 0.75) : 1;

  ctx.imageSmoothingEnabled = false;
  canvas.width = canvas.height = Math.min(maxSize * resizeRatio, pixelCrop.width);

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    canvas.width,
    canvas.height
  );

  if (resizeRatio <= 0.75) {
    return getCroppedImg(canvas.toDataURL("image/png"), {
      width: canvas.width,
      height: canvas.height,
      x: 0,
      y: 0,
    });
  }

  return canvas.toDataURL("image/png");
}

const Slider = ({
  value,
  label,
  changeHandler,
  ...props
}: Omit<SliderPrimitive.SliderProps, "value"> & {
  value: number;
  label: string;
  changeHandler: (value: number) => void;
}) => (
  <SliderPrimitive.Root
    className="relative flex items-center select-none w-40 h-4 mt-2"
    value={[value]}
    aria-label={label}
    onValueChange={(value) => {
      if (value[0]) {
        changeHandler(value[0]);
      }
    }}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1 flex-grow rounded-md bg-neutral-400">
      <SliderPrimitive.Range className="absolute h-full rounded-full bg-neutral-700" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-3 w-3 cursor-pointer rounded-full bg-neutral-700 transition-all hover:bg-neutral-600 focus:shadow-[0 0 0 4px rgba(0,0,0,0.2)]" />
  </SliderPrimitive.Root>
);
