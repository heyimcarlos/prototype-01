import { Avatar } from "@/components/Avatar";
import ImageUploader from "@/components/ImageUploader";
import DashboardLayout from "@/components/layouts/dashboard";
import { trpc } from "@/utils/trpc";
import React, { useEffect } from "react";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { type NextPageWithLayout } from "../_app";

const SettingsPage: NextPageWithLayout = () => {
  const { data: user, isLoading } = trpc.user.me.useQuery();

  const formMethods = useForm({
    defaultValues: {
      avatar: "",
      name: "",
      email: "",
      bio: "",
    },
  });

  const {
    reset,
    formState: { isSubmitting, isDirty },
    handleSubmit,
  } = formMethods;

  useEffect(() => {
    if (user) {
      reset(
        {
          avatar: user?.avatar || "",
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

  const onSubmit: SubmitHandler<{
    avatar: string;
    name: string;
    email: string;
    bio: string;
  }> = (values) => {
    console.log({ values });
  };

  if (isLoading || !user) return <div>Loading...</div>;
  const isDisabled = isSubmitting || !isDirty;

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center">
          <Controller
            control={formMethods.control}
            name="avatar"
            render={({ field: { value }, fieldState, formState }) => (
              <>
                {console.log({ fieldState, formState })}
                <Avatar alt="" imageSrc={value} size={12} />
                <div className="ml-4">
                  <ImageUploader
                    target="avatar"
                    id="avatar-upload"
                    buttonMsg={"Change Avatar"}
                    handleAvatarChange={(newAvatar) => {
                      formMethods.setValue("avatar", newAvatar, {
                        shouldDirty: true,
                        shouldValidate: true,
                      });
                    }}
                    imageSrc={value}
                  />
                </div>
              </>
            )}
          />
        </div>
        <button disabled={isDisabled} className="mt-8" type="submit">
          Update
        </button>
      </form>
    </FormProvider>
  );
};

SettingsPage.layout = DashboardLayout;

export default SettingsPage;
