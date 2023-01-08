import { Avatar } from "@/components/ui/Avatar";
import { ImagesUploader } from "@/components/newListingComponents/formComponents/ImagesUploader";
import ImageUploader from "@/components/ImageUploader";
import DashboardLayout from "@/components/layouts/dashboard";
import { trpc } from "@/utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import _ from "lodash";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { type NextPageWithLayout } from "../_app";

type AvatarSectionProps = {
  imageSrc: string;
  onSave: (newAvatar: string) => void;
};

const AvatarSection = ({ imageSrc, onSave }: AvatarSectionProps) => {
  return (
    <section className="mb-8 rounded-md border bg-white sm:rounded-lg">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Your Avatar
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>This is your avatar.</p>
              <p>Click below to upload a custom one from your files.</p>
            </div>
          </div>
          <div className="flex-shrink-0 md:mr-6">
            <Avatar alt="" imageSrc={imageSrc} size={20} />
          </div>
        </div>
      </div>
      <div className="border-t bg-indigo-100 p-6 text-center md:flex md:items-center md:justify-between">
        <div className="mb-2 text-sm text-gray-500 md:mb-0">
          <p>An avatar is optional but strongly recommended.</p>
        </div>

        <ImageUploader
          target="avatar"
          id="avatar-upload"
          buttonMsg={"Change Avatar"}
          handleAvatarChange={onSave}
          imageSrc={imageSrc}
        />
      </div>
    </section>
  );
};

const ForwardedPhoneInput = React.forwardRef<HTMLInputElement>((props, ref) => (
  <input
    ref={ref}
    {...props}
    name="phone"
    type="tel"
    autoComplete="phone"
    className="w-full rounded border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
  />
));

ForwardedPhoneInput.displayName = "Input";

const FormSchema = z.object({
  name: z.string().min(1, "required"),
  bio: z.string().max(500),
  email: z.string().min(1, "required").email("Invalid email"),
  // address: z.string().min(10, "required"),
  // phone: z
  //   .string({ required_error: "required" })
  //   .min(12, "Número de teléfono inválido")
  //   .max(12, "Número de teléfono inválido"),
});

type FormValues = z.infer<typeof FormSchema>;

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => {
  return <span className="text-sm text-red-500">{message}</span>;
};

const SettingsPage: NextPageWithLayout = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const utils = trpc.useContext();
  const { data: user, isLoading } = trpc.user.me.useQuery();
  const mutation = trpc.user.updateProfile.useMutation({
    onSettled: () => {
      utils.user.me.invalidate();
    },
    onError: (e) => {
      setErrorMessage(e.message);
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    if (user) {
      reset(
        {
          name: user?.name || "",
          email: user?.email || "",
          bio: user?.bio || "",
        },
        {
          keepDirtyValues: true,
        }
      );
    }
  }, [reset, user]);

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    mutation.mutate(values);
  };

  if (isLoading || !user) return null;
  const isDisabled = isSubmitting || !isDirty;

  return (
    <div className="mx-auto max-w-3xl">
      <header className="mx-auto block justify-between sm:flex sm:pt-8">
        <div className="mb-8 flex w-full items-center border-b border-gray-200 pb-8">
          <div>
            <h3 className="mb-1 text-xl font-bold leading-6 tracking-wide text-black">
              {_.capitalize(router.pathname.replace("/", ""))}
            </h3>
            <p className="max-w-2xl text-sm text-gray-500">
              This information will be displayed publicly so be careful what you
              share.
            </p>
          </div>
        </div>
      </header>
      <AvatarSection
        imageSrc={user.avatar}
        onSave={(newAvatar) => mutation.mutate({ avatar: newAvatar })}
      />
      <section className="rounded-md border bg-white sm:rounded-lg">
        <div className="p-6">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Personal Information
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>
          </div>
          <form
            className="space-y-8 divide-y divide-gray-200"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
              <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
                <div className="space-y-6 sm:space-y-5">
                  <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Name
                    </label>
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <input
                        {...register("name")}
                        type="text"
                        placeholder="Maria"
                        name="name"
                        id="name"
                        autoComplete="given-name"
                        className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                      />
                      {errors.name?.message && (
                        <ErrorMessage message={errors.name.message} />
                      )}
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Email
                    </label>
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <input
                        lang="ES"
                        {...register("email")}
                        id="email"
                        name="email"
                        placeholder="mariaperez@gmail.com"
                        // onInvalid={(e) =>
                        //   e.currentTarget.setCustomValidity(
                        //     "Por favor incluya una '@' en la dirección de correo electrónico."
                        //   )
                        // }
                        onInvalidCapture={() => "hello"}
                        type="email"
                        autoComplete="email"
                        className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                      />
                      {errors.email?.message && (
                        <ErrorMessage message={errors.email.message} />
                      )}
                    </div>
                  </div>
                  <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Description
                    </label>
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <textarea
                        {...register("bio")}
                        id="bio"
                        name="bio"
                        rows={4}
                        className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                      />
                      {errors.bio?.message && (
                        <ErrorMessage message={errors.bio.message} />
                      )}
                    </div>
                    <p className="mt-3 text-sm text-gray-500">
                      Brief description for your profile.
                    </p>
                  </div>

                  {/*
                  <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Phone
                    </label>
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <Controller
                        name="phone"
                        control={control}
                        rules={{
                          validate: (value) => isValidPhoneNumber(value),
                        }}
                        render={({ field: { value, onChange } }) => (
                          <PhoneInput
                            placeholder="809-111-1111"
                            inputComponent={ForwardedPhoneInput}
                            value={value}
                            onChange={onChange}
                            defaultCountry="DO"
                            limitMaxLength
                            className="block w-full max-w-lg rounded-md   pl-2 sm:max-w-xs sm:text-sm"
                          />
                        )}
                      />
                      {errors.phone?.message && (
                        <ErrorMessage message={errors.phone.message} />
                      )}
                    </div>
                  </div>
                */}
                </div>
              </div>
            </div>
            {errorMessage && <ErrorMessage message={errorMessage} />}

            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  disabled={isDisabled}
                  type="submit"
                  className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

SettingsPage.layout = DashboardLayout;

export default SettingsPage;
