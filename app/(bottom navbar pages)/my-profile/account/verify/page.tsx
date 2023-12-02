"use client";
import { GoBack } from "@/components/go-back";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import BadgeIcon from "@/public/badge-check.svg";
import { CheckCircledIcon, ReloadIcon } from "@radix-ui/react-icons";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { ChangeEvent, useEffect, useRef, useState } from "react";

export default function VerifyPage() {
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function getUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) setUserId(session.user.id);
    }

    getUser();
  }, [supabase]);

  const selfieInput = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    selfieInput.current?.click();
  };

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files && event.target.files.length !== 0) {
      const files = event.target.files;
      const file = event.target.files[0];

      try {
        setLoading(true);
        const filePath = `${userId}/${file.name}`;
        const { error } = await supabase.storage
          .from("verification_photos")
          .upload(filePath, file);

        if (error) {
          console.log("error :", error);
          toast({
            variant: "destructive",
            title: "Йой, щось пішло те так",
          });
        } else {
          toast({
            variant: "success",
            action: (
              <div className="flex w-fit items-center">
                <span className="first-letter:capitalize">
                  Фото успішно відправлено
                </span>
                <CheckCircledIcon className="ml-3 h-6 w-6" />
              </div>
            ),
          });
        }
      } catch (error) {
        console.log("error: ", error);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <section className="p-4 md:mx-auto md:w-[500px]">
      <div className="flex items-center gap-3">
        <GoBack />
        <h1 className="text-3xl font-bold">Верифікація акаунту</h1>
      </div>

      <div className="mb-20 mt-6 flex flex-col gap-3">
        <h2 className=" text-xl font-semibold">Що таке верифікація акаунту?</h2>
        <p className="">
          Це процес підтвердження Кожен профіль повинен мати принаймні три
          фотографії. Ці фото допомагають іншим побачити вашу особистість
          завдяки візуальній розповіді. Ми серйозно ставимося до безпеки.
        </p>
        <p>
          Тому, кожен може безкоштовно верифікувати своє фото за допомогою
          селфі.{" "}
          <strong>
            Ми порівняємо надану вами селфі з фотографіями, які ви завантажуєте
            у свій профіль, щоб перевірити, чи це насправді ви.
          </strong>{" "}
          Хоча ми не можемо сказати, що це на 100% надійно, ми робимо все
          можливе, щоб зберегти цю спільноту в безпеці. Процес перевірки
          повністю проводиться вручну нашою командою. Ми цінуємо вашу співпрацю
          в додаванні селфі та дбаємо про безпеку цієї спільноти!
        </p>
        <h2 className=" text-xl font-semibold">Як пройти верифікацію?</h2>
        <p className="">
          Все що треба - це завантажити одне селфі-фото, в якому чітко видно
          ваше обличчя. В залежності від навантаженості команди, процес може
          зайняти до трьох днів.
        </p>
        <p className="">
          Як тільки ваш акаунт буде підтверджено, навпроти вашого імені
          з&apos;явиться бейдж верифікації -{" "}
          <BadgeIcon
            className="inline-block align-text-top text-white"
            width={24}
            height={24}
          />
        </p>

        <label
          className="mt-4 block text-lg font-semibold"
          htmlFor="file_input"
        >
          Завантажити селфі
        </label>
        <div className="flex items-center gap-4">
          <Button onClick={handleClick} className=" self-start text-base">
            Додати
          </Button>
          {loading && (
            <Button size="icon" variant="ghost">
              <ReloadIcon className="bg-gre h-5 w-5 animate-spin" />
            </Button>
          )}
        </div>
        <input
          className="hidden"
          ref={selfieInput}
          onChange={handleChange}
          capture="user"
          accept="image/*"
          type="file"
          id="file_input"
        />
      </div>
    </section>
  );
}
