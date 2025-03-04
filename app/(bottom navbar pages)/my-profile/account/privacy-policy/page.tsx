import { GoBackBtn } from "@/components/go-back-btn";

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto p-4 md:w-[500px]">
      <div className="mb-4 flex items-center gap-3">
        <GoBackBtn />
        <h1 className="text-2xl font-bold">Політика конфіденційності</h1>
      </div>

      <div className="mb-32 space-y-6">
        <strong className=" block text-xl">Вступ</strong>
        <p>
          <span className="mb-2 block font-bold">
            Права інтелектуальної власності
          </span>
          Цей документ був створений з використанням шаблона із сайту SEQ Legal{" "}
          <a
            className="underline hover:underline-offset-2"
            rel="noreferrer noopener ugc"
            target="_blank"
            href="https://seqlegal.com"
          >
            (seqlegal.com)
          </a>{" "}
          та модифікований вебсайтом Website Planet{" "}
          <a
            className="underline hover:underline-offset-2"
            rel="noreferrer noopener ugc"
            target="_blank"
            href="http://www.websiteplanet.com"
          >
            (www.websiteplanet.com)
          </a>
        </p>
        <div>
          <ol className="list-decimal space-y-4 px-6">
            <li>
              Конфіденційність користувачів веб-сайту Imago має велике значення
              для нас, і ми докладаємо всіх зусиль для забезпечення її захисту.
              Дані правила пояснюють, як ми використовуємо вашу персональну
              інформацію.
            </li>
            <li>
              Погоджуючись із використанням файлів-cookie при першому відвіданні
              нашого веб-сайту, відповідно до положень даних Правил, ви надаєте
              нам дозвіл на використання файлів-cookie при кожному вашому
              наступному візиті.
            </li>
          </ol>
        </div>

        <div>
          <strong className="mb-4 block text-xl">
            Збір персональних даних
          </strong>
          <p className="mb-4">
            Ваші дані завжди належать вам, і лише вам. Ми не укладаємо рекламних
            угод і не збираємо конфіденційні особисті дані. Ми не будемо
            передавати вашу персональну інформацію жодній сторонній компанії для
            прямого маркетингового використання.
          </p>
          <p className="mb-4">Які дані ми збираємо</p>
          <ol className="list-decimal space-y-4 px-6">
            <li>
              Інформація про адресу вашої електронної пошти, яку ви використали
              для реєстрації на нашому вебсайті (не використовується для
              розсилок);
            </li>
            <li>
              Інформація, яку ви ввели під час створення профілю на нашому
              веб-сайті – наприклад, ваше ім&apos;я, зображення у вашому
              профілі, стать, дата народження, місцезнаходження, конфесію;
            </li>
            <li>
              Будь-яка інша персональна інформація, яку ви самі нам надсилаєте.
            </li>
          </ol>
          <p className="mt-6">
            Усі дані про користувачів обробляються виключно на серверах, які
            знаходяться на території Європейського Союзу та захищені законами
            ЄС.
          </p>
        </div>
        <div>
          <strong className="mb-4 block text-xl">
            Використання вашої персональної інформації
          </strong>
          <p className="mb-6">
            Персональна інформація, яку ви передані нам через наш веб-сайт, буде
            використовуватися задля цілей, зазначених в цих правилах або на
            відповідних сторінках веб-сайту. Ми можемо використовувати вашу
            персональну інформацію в наступних цілях:
          </p>

          <ol className="list-decimal space-y-4 px-6">
            <li>адміністрування нашого веб-сайту та бізнесу;</li>

            <li>
              надання вам можливості користуватися сервісами, доступними на
              нашому веб-сайті;
            </li>

            <li>надання вам послуг, придбаних через наш веб-сайт;</li>

            <li>
              надсилання вам електронною поштою повідомлень, які ви спеціально
              запросили;
            </li>

            <li>
              обробка запитів та скарг, зроблених вами або на вас, і які
              стосуються нашого веб-сайту;
            </li>
            <li>
              з метою забезпечення безпеки нашого сайту та попередження
              шахрайства;
            </li>
            <li>
              з метою перевірки відповідності умовам та правилам, які
              регламентують використання нашого веб-сайту.
            </li>
          </ol>
          <p className="mt-6">
            Ми не будемо передавати вашу персональну інформацію жодній сторонній
            компанії для прямого маркетингового використання.
          </p>
        </div>

        <div>
          <strong className="mb-4 block text-xl">
            Розкриття персональної інформації
          </strong>
          <ol className="list-decimal space-y-4 px-6">
            <li>
              Ми лишаємо за собою право розкрити вашу персональну інформацію для
              будь-якого з наших працівників та керівників в об’ємі та цілях,
              визначених в цих правилах.
            </li>
            <li>
              Ми лишаємо за собою право розкрити вашу персональну інформацію:
              <ul className="list-disc space-y-4 px-6">
                <li>в тих випадках, в яких цього від нас вимагає закон;</li>
                <li>
                  у зв&apos;язку з будь-яким поточними або майбутніми судовими
                  процесами;
                </li>
                <li>
                  з метою встановлення, реалізації або захисту наших законних
                  прав;
                </li>
                <li>
                  Ми не будемо розкривати вашу персональну інформацію третім
                  особам, за виключенням випадків, зазначених в цих правилах.
                </li>
              </ul>
            </li>
          </ol>
        </div>

        <div>
          <strong className="mb-4 block text-xl">
            Міжнародні передачі персональної інформації
          </strong>

          <p>
            Персональна інформація, які ви публікуєте на нашому веб-сайті, через
            Інтернет, може бути доступна в усьому світі. Ми не можемо
            перешкодити її використанню, або неправомірному використанню в
            злочинних цілях, сторонніми особами.
          </p>
        </div>

        <div>
          <strong className="mb-4 block text-xl">
            Збереження персональної інформації
          </strong>

          <ul className="space-y-4 px-6">
            <li>
              Дані правила та процедури призначені для забезпечення виконання
              нами наших юридичних зобов&apos;язань щодо збереження та видалення
              персональної інформації.
            </li>
            <li>
              Інформація, яку ми обробляємо з певною метою або в певних цілях не
              повинна зберігатися довше, ніж потрібно для досягнення цієї мети
              або цих цілей.
            </li>
            <li>
              Попри інші положення цього документу, ми будемо зберігати
              документи (включаючи електронні документи), які містять
              персональну інформацію в тих випадках, в яких цього від нас
              вимагає закон, якщо ми вважатимемо, що ці документи можуть мати
              відношення до будь-якого поточного або майбутнього судового
              розгляду.
            </li>
          </ul>
        </div>

        <div>
          <strong className="mb-4 block text-xl">
            Захист вашої персональної інформації
          </strong>
          <ol className="list-decimal space-y-4 px-6">
            <li>
              Ми будемо вживати достатні технічні та організаційні заходи для
              попередження втрати, протиправного використання чи підробки вашої
              персональної інформації.
            </li>
            <li>
              Всю надану вами персональну інформацію ми будемо зберігати на
              наших захищених (як паролем, так і фаєрволами) серверах.
            </li>
            <li>
              Ви підтверджуєте своє ознайомлення з тим фактом, що передача
              інформації через Інтернет є по суті є незахищеною, і ми не можемо
              гарантувати захист даних, надісланих через всесвітню мережу.
            </li>
            <li>
              Ви несете повну відповідальність за збереження свого пароля для
              доступу на наш веб-сайт в таємниці. Ми ніколи не будемо запитувати
              ваш пароль (за виключенням випадків, коли ви намагаєтесь увійти до
              свого облікового запису на нашому сайті).
            </li>
          </ol>
        </div>

        <div>
          <strong className="mb-4 block text-xl">Зміни та поправки</strong>
          Ми лишаємо за собою право періодично вносити зміни та поправки в ці
          правила, та публікувати їх нову редакцію на нашому сайті. Ви повинні
          періодично перевіряти цю веб-сторінку, щоб пересвідчитись, що
          розумієте зміст змін, внесених до цих правил. Ми також можемо
          проінформувати вас про внесення змін до цих правил шляхом надсилання
          електронної пошти або через систему передачі приватних повідомлень
          нашого сайту.
        </div>

        <div className="space-y-4">
          <strong className="mb-4 block text-xl">Ваші права</strong>
          <p>
            Ви можете надати нам вказівку надавати вам будь-яку персональну
            інформацію про вас, яку ми маємо; надання такої інформації буде
            здійснюватись в наступних випадках: надання відповідних підтверджень
            вашої особи (ми зазвичай приймаємо фотокопію вашого паспорта,
            завірену нотаріусом).
          </p>
          <p>
            Ми лишаємо за собою відмовити в наданні інформації за вашим запитом,
            в межах чинного законодавства.
          </p>
        </div>

        <p>
          <strong className="mb-4 block text-xl">Сторонні веб-сайти</strong>
          Наш веб-сайт містить гіперпосилання на, та деталі про веб-сайти
          сторонніх компаній та осіб. Ми не маємо інструментів керування, та не
          несемо відповідальності за політику конфіденційності й практики
          сторонніх осіб та компаній в цій галузі.
        </p>

        <div className="space-y-4">
          <strong className="mb-4 block text-xl">Файли-Cookies</strong>
          <p>
            Файли cookie – це файли, створені веб-сайтами, які ви відвідали.
            Вони зберігають інформацію про ваше відвідування, щоб вам було
            зручніше користуватись Інтернетом. Зокрема, завдяки файлам cookie ви
            можете не виходити з облікового запису на сайтах, зберігати
            налаштування сайтів і переглядати доречний контент відповідно до
            вашого місцезнаходження.
          </p>
          <p>
            Ми використовуємо тільки технічні файли cookie, не зберігаємо ваші
            особисті дані, навіть IP-адресу.
          </p>
          <p>
            Технічні файли cookie, потрібні, щоб зробити можливою вашу навігацію
            на Сайті та забезпечити безпеку. Технічні файли cookie включають
            файли, які суворо необхідні для перегляду нашого Сайту. Технічні
            файли cookie також дозволяють застосовувати заходи безпеки.
          </p>
          <p>Які це саме файли:</p>
          <ol className="space-y-4 px-6">
            <li>
              Token вашого облікового запису на Імаго, який допомагає вам
              залишатися в системі (бути авторизованим), коли ви знову
              відвідуєте сайт. Він дійсний лише годину, після чого він
              замінюється на новий, щоб покращити захист вашого профілю.
            </li>
            <li>
              Refresh Token, який дозволяє залишатися авторизованим на сайті
              навіть після тривалої відсутності (від 10 хвилин до 1 місяця). Цей
              Token використовується, щоб залишати вас авторизованими на сайті,
              навіть якщо ви не відвідували його протягом тривалого періоду
              часу.
            </li>
          </ol>
          <p>
            Жоден з цих файлів cookie не складається з ваших персональних даних,
            а отже не використовуються для рекламних цілей. Вони потрібні для
            зручного користування Сайтом і покращення захисту вашого облікового
            запису.
          </p>
          <p>
            Ви можете заблокувати використання цих файлів cookie та видалити їх
            за допомогою налаштувань браузера, однак це може вплинути на
            коректну роботу Сайту. Видаливши описані файли cookie, Вам потрібно
            буде щоразу авторизуватись при кожному відвідуванні платформи.
          </p>
        </div>
      </div>
    </div>
  );
}
