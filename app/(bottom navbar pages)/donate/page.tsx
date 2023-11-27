import { GoBack } from "@/components/go-back";
import Image from "next/image";

export default function DonatePage() {
  return (
    <div className="p-4 pb-24 md:mx-auto md:max-w-[80ch] ">
      <div className="mb-10 flex items-center gap-3">
        <GoBack />
        <h1 className="text-3xl font-bold">Підтримати</h1>
      </div>
      {/* <Me /> */}
      <Image
        className="mx-auto mb-4"
        src={"/me.svg"}
        alt="person illustration"
        width={250}
        height={100}
      />
      <div className="space-y-4">
        <p className="a">
          Привіт, я розробник Імаго - нової дейтінг-платформи, яка виникла з
          нагальної потреби в якісній та спеціалізованій платформі для християн
          України. Моя мета - створити місце, де люди зможуть знаходити
          відносини, спільноту та підтримку, згуртовані спільними цінностями.
        </p>
        <p className="a">
          Наразі проєкт лише починається, і кожен внесок має велике значення.
          Зібрані кошти допоможуть нам розвивати та вдосконалювати платформу.
          Невелика сума, яку ми маємо наразі, є лише початком нашого шляху.
        </p>
        <p className="a">
          Якщо вам важливі якісні та змістовні знайомства, і ви б хотіли
          підтримати цей проєкт, буду вдячний за будь-яку фінансову допомогу.
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
