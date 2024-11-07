import { GoBackBtn } from "@/components/go-back-btn";
import Image from "next/image";

export default function DonatePage() {
  return (
    <div className="p-4 md:mx-auto md:max-w-[500px] ">
      <div className="mb-10 flex items-center gap-3">
        <GoBackBtn />
        <h1 className="text-3xl font-bold">Підтримати</h1>
      </div>
      <Image
        className="mx-auto mb-4 block dark:hidden"
        src={"/me.svg"}
        alt="person illustration"
        width={250}
        height={100}
      />
      <Image
        className="mx-auto mb-4 hidden dark:block"
        src={"/me-dark.svg"}
        alt="person illustration"
        width={250}
        height={100}
      />
      <div className="space-y-4 text-lg">
        <p className="a">
          Привіт, я розробник Імаго - нової дейтінг-платформи, яка виникла з
          нагальної потреби в якісній та спеціалізованій платформі для християн
          України. Моя мета - створити місце, де люди зможуть знаходити
          відносини, спільноту та підтримку, згуртовані спільними цінностями.
        </p>
        <p className="a">
          Наразі проєкт знаходиться на початковій стадії, тому кожен внесок має
          велике значення. Зібрані кошти допоможуть нам розвивати та
          вдосконалювати цей проєкт.
        </p>
        <p className="a">
          Кожен ваш внесок допоможе нам створити щось особливе для нашої
          спільноти.
        </p>
        <span className="block text-xl font-bold">
          Приват - 4149609010793463
        </span>
      </div>
    </div>
  );
}
