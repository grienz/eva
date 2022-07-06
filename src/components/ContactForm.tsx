import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

import { GLOBAL_CONFIG } from "../utils/global.config";

interface Inputs {
  email: string;
  name: string;
  message: string;
  model: string;
  locale: string;
}
const Contact: React.FC = () => {
  const t = useTranslations("Contact");
  const { register, handleSubmit } = useForm<Inputs>();
  const router = useRouter();
  const onSubmit: SubmitHandler<Inputs> = ({ message, email, name }) => {
    router.push(
      `mailto:${GLOBAL_CONFIG.mail}?body=${encodeURIComponent(
        `${name && name} (${email}):\n\n${message}`
      )}`
    );
  };

  return (
    <div className="my-6 mx-auto flex w-full max-w-2xl flex-col justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col rounded-md border border-sky-600 p-4 dark:border-sky-400"
      >
        <label
          className="pl-2 font-medium text-black dark:text-white"
          htmlFor="contact-email"
        >
          {t("email")}
        </label>
        <input
          type="email"
          id="contact-email"
          className="input text-md mx-2 my-2 resize-none rounded-md border-1 border-sky-600 bg-transparent p-4 py-2 px-2 font-light dark:border-sky-400"
          autoComplete="off"
          placeholder={t("email_input")}
          {...register("email", { required: true })}
        />
        <label
          className="pl-2 font-medium text-black dark:text-white"
          htmlFor="contact-name"
        >
          {t("name")}
        </label>
        <input
          type="text"
          id="contact-name"
          className="input text-md mx-2 my-2 resize-none rounded-md border-1 border-sky-600 bg-transparent p-4 py-2 px-2 font-light dark:border-sky-400 "
          placeholder={t("name_input")}
          autoComplete="off"
          {...register("name", { required: false })}
        />
        <label
          className="pl-2 font-medium text-black dark:text-white"
          htmlFor="contact-message"
        >
          {t("message")}
        </label>
        <textarea
          rows={3}
          id="contact-message"
          className="input text-md mx-2 my-2 resize-none rounded-md border-1 border-sky-600 bg-transparent p-4 py-2 px-2 font-light dark:border-sky-400"
          placeholder={t("message_input")}
          {...register("message", { required: true })}
        />
        <input
          type="submit"
          className="mx-2 my-2 flex flex-row justify-center rounded-md border-1  border-sky-600 p-4 py-2 px-2 font-medium text-black hover:animate-pulse hover:text-sky-600 dark:border-sky-400  dark:text-white dark:hover:text-sky-400 "
          value={t("send")}
        />
      </form>
    </div>
  );
};

export default Contact;
