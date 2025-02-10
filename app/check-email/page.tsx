import { MailCheck } from "lucide-react";

export default function CheckEmailPage() {
  return (
    <div className="grid h-[100svh] w-full place-items-center">
      <div className="w-full max-w-sm space-y-4 text-center">
        <MailCheck className="text-primary mx-auto h-12 w-12" />
        <h1 className="text-2xl font-semibold tracking-tight">
          Перевірте вашу пошту
        </h1>
        <p className="text-muted-foreground text-sm">
          Ми надіслали вам посилання для входу. Воно може з&apos;явитися в папці
          зі спамом.
        </p>
      </div>
    </div>
  );
}
