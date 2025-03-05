import type { ReactElement } from "react"
import Image from "next/image"
import { Layout } from "@components/common"
import { Breadcrumbs, Card, Section } from "@components/ui"
import Head from "@modules/common/components/head"

import a15 from "../../public/img/A15.jpg"
import ba400 from "../../public/img/BA400.jpg"
import dynexDs2 from "../../public/img/DynexDS2.jpg"
import elite3 from "../../public/img/ELite3.jpg"
import humaclot from "../../public/img/humaclot.jpg"
import immulite2000xpi from "../../public/img/immulite-2000xpi.png"
import microscope from "../../public/img/microscope.jpg"
import sysmexXN550 from "../../public/img/sysmex_XN_550.jpg"
import terraLab from "../../public/img/terralab.png"
import makagon from "../../public/makagon_i.jpg"

const About = () => {
  return (
    <>
      <Head
        title="Про лабораторію - українська медична лабораторія VitaLab"
        description="Медичні лабораторні дослідження у Дніпрі. Понад 400 аналізів. Європейське обладнання та стандарти якості."
      />
      <Section>
        <div className="pb-20 md:pb-32">
          <div
            className="section__row-layout"
            style={
              {
                "--row-layout-gap": `var(--row-layout-gap-large)`,
              } as React.CSSProperties
            }
          >
            <Breadcrumbs title="Обладнання" />
            {/* <div className="grid gap-y-6">
              <header className="relative grid max-w-[810px] gap-y-6 px-4 md:hidden">
                <h1 className="text-xl font-medium leading-tight text-gray-900 md:text-4xl">
                  Про лабораторію
                </h1>
              </header>
            </div> */}
            {/* <div className="grid items-start gap-y-8 sm:grid-cols-2">
              <div
                className="section__row-layout"
                style={
                  {
                    "--row-layout-gap": `var(--row-layout-gap-normal)`,
                  } as React.CSSProperties
                }
              >
                <div className="max-w-[810px] px-4 text-m leading-[1.6] text-gray-900 sm:pr-28">
                  <p>
                    Бажання створити багатопрофільну лабораторію VitaLab
                    сімейного типу виникло дуже давно, і для цього був ряд
                    обґрунтованих передумов.
                  </p>
                  <p className="mt-2">
                    Маючи особистий досвід роботи (більше 17 років) в
                    клініко-діагностичної лабораторії педіатричної служби, стало
                    зрозуміло, що найчастіше недостатньо мати тільки клінічну
                    картину хвороби дитини. У формуванні точного діагнозу велику
                    роль відіграє анамнез батьків дитини. Отже, виникла
                    необхідність призначати лабораторні дослідження дітям і їх
                    батькам, для повноти картини обстежувати цілі сім&apos;ї.
                  </p>
                  <p className="mt-2">
                    Піклуйтеся Вашим здоров&apos;ям разом з лабораторією
                    VitaLab!
                  </p>
                  <p className="mt-2">
                    Лабораторія VitaLab - не мережева лабораторія! Ми дуже
                    вибірково пропонуємо співпрацю медико-діагностичним центрам
                    міста і області, які, так само як і ми, орієнтовані на
                    надання професійної, своєчасної допомоги своїм пацієнтам.
                  </p>
                </div>
              </div>
              <div>
                <div className="mb-1 pr-4 text-right text-s">
                  Директор лабораторії VitaLab,
                  <br /> лікар-лаборант вищої категорії Макогон Ірина
                </div>
                <Card className="bg-white" shadow="xlarge">
                  <Image alt="" src={makagon} />
                </Card>
              </div>
              <div className="px-4 text-m leading-[1.6] text-gray-900 sm:col-span-2">
                <p>
                  Якщо Вам необхідно здати аналізи на всі види досліджень в
                  одному місці, отримати вірогідні і точні результати, тоді
                  запрошуємо Вас відвідати сучасну, багатопрофільну, і надійну
                  лабораторію VitaLab.
                </p>
                <p className="mt-2">
                  Наша лабораторія пропонує великий перелік досліджень, даючи
                  можливість пацієнтам об&apos;єктивно оцінювати стан свого
                  здоров&apos;я протягом життя. Від інших лабораторій нас
                  відрізняє готовність шукати індивідуальний підхід і рішення
                  для кожного клієнта.
                </p>
                <p className="mt-2">
                  Лабораторія VitaLab оснащена автоматичними системами,
                  розробленими на основі новітніх технологій, що забезпечує
                  високу якість і точність результатів досліджень.
                </p>
                <p className="mt-2">
                  Перелік використовуваного лабораторією обладнання включає в
                  себе:
                </p>
                <div className="mt-4">
                  <ul className="my-1 grid grid-cols-1 gap-x-8 gap-y-1 md:grid-cols-1">
                    <li className="relative pl-6">
                      <svg
                        className="absolute left-0 top-[3px] fill-orange-500"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                      >
                        <g fillRule="evenodd">
                          <circle opacity=".15" cx="8" cy="8" r="8"></circle>
                          <path d="M11.41 4.93L6.64 9.54 5.38 8.18a.7.7 0 0 0-.87-.04.61.61 0 0 0-.18.8l1.5 2.45c.15.22.41.36.69.36.28 0 .53-.14.68-.36.24-.31 4.82-5.78 4.82-5.78.6-.6-.13-1.15-.6-.68z"></path>
                        </g>
                      </svg>
                      Біохімічний аналізатор &quot;А-15&quot; виробництва
                      &quot;BioSystems S.A.&quot;, Іспанія
                    </li>
                    <li className="relative pl-6">
                      <svg
                        className="absolute left-0 top-[3px] fill-orange-500"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                      >
                        <g fillRule="evenodd">
                          <circle opacity=".15" cx="8" cy="8" r="8"></circle>
                          <path d="M11.41 4.93L6.64 9.54 5.38 8.18a.7.7 0 0 0-.87-.04.61.61 0 0 0-.18.8l1.5 2.45c.15.22.41.36.69.36.28 0 .53-.14.68-.36.24-.31 4.82-5.78 4.82-5.78.6-.6-.13-1.15-.6-.68z"></path>
                        </g>
                      </svg>
                      Бінокулярні цифрові мікроскопи &quot;Carl Zeiss Primo
                      Star&quot;, Німеччина
                    </li>
                    <li className="relative pl-6">
                      <svg
                        className="absolute left-0 top-[3px] fill-orange-500"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                      >
                        <g fillRule="evenodd">
                          <circle opacity=".15" cx="8" cy="8" r="8"></circle>
                          <path d="M11.41 4.93L6.64 9.54 5.38 8.18a.7.7 0 0 0-.87-.04.61.61 0 0 0-.18.8l1.5 2.45c.15.22.41.36.69.36.28 0 .53-.14.68-.36.24-.31 4.82-5.78 4.82-5.78.6-.6-.13-1.15-.6-.68z"></path>
                        </g>
                      </svg>
                      Універсальний гематологічний аналізатор &quot;ELite
                      3&quot; виробництва &quot;Erba Lachema&quot;, Чехія
                    </li>
                    <li className="relative pl-6">
                      <svg
                        className="absolute left-0 top-[3px] fill-orange-500"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                      >
                        <g fillRule="evenodd">
                          <circle opacity=".15" cx="8" cy="8" r="8"></circle>
                          <path d="M11.41 4.93L6.64 9.54 5.38 8.18a.7.7 0 0 0-.87-.04.61.61 0 0 0-.18.8l1.5 2.45c.15.22.41.36.69.36.28 0 .53-.14.68-.36.24-.31 4.82-5.78 4.82-5.78.6-.6-.13-1.15-.6-.68z"></path>
                        </g>
                      </svg>
                      Автоматичний імуноферментний аналізатор
                      &quot;Lazurite&quot;, виробництва &quot;DYNEX Technologies
                      Ltd.&quot;, США
                    </li>
                    <li className="relative pl-6">
                      <svg
                        className="absolute left-0 top-[3px] fill-orange-500"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                      >
                        <g fillRule="evenodd">
                          <circle opacity=".15" cx="8" cy="8" r="8"></circle>
                          <path d="M11.41 4.93L6.64 9.54 5.38 8.18a.7.7 0 0 0-.87-.04.61.61 0 0 0-.18.8l1.5 2.45c.15.22.41.36.69.36.28 0 .53-.14.68-.36.24-.31 4.82-5.78 4.82-5.78.6-.6-.13-1.15-.6-.68z"></path>
                        </g>
                      </svg>
                      Оптичний аналізатор-коагулометр &quot;HumaClot&quot;,
                      виробництва &quot;Human GmbH&quot;, Німеччина
                    </li>
                  </ul>
                </div>
                <div className="mt-4">
                  <p className="mt-2">
                    Лабораторія оснащена унікальною технологією автоматизації
                    преаналітичного і постаналітичного періодів проведення
                    лабораторних методів досліджень - лабораторною інформаційною
                    системою &quot;Terra&quot;, спеціально адаптованою
                    прибалтійською компанією “Terra Systems” для VitaLab. Це
                    забезпечує автоматизацію процесу призначень досліджень,
                    реєстрації, отримання унікального коду замовлення у вигляді
                    штрихкоду, відправки завдань на аналізатори, швидкого пошуку
                    результатів досліджень. Коли дослідження буде виконано,
                    електронний звіт (після обробки інформації) буде автоматично
                    збережений в архіві звітів. Результати досліджень
                    автоматично розсилаються електронною поштою в медичні
                    центри, пацієнтам або лікуючим лікарям.
                  </p>
                  <p className="mt-2">
                    Завдяки віддаленому доступу до нашої бази реєстрації,
                    співробітники медичних центрів виконують експорт електронних
                    замовлень своїх пацієнтів, що значно скорочує час з моменту
                    забору біоматеріалу до початку лабораторного процесу і,
                    отже, покращує якість досліджень.
                  </p>
                  <p className="mt-2">
                    Всі контрольні матеріали і тест-системи, які використовують
                    фахівці лабораторії, виготовлені провідними виробниками
                    згідно з сертифікатами якості європейських країн,
                    зареєстровані в Україні, внесені до Державного Реєстру
                    медичної техніки та виробів медичного призначення, і
                    дозволені для використання в медичній практиці.
                  </p>
                  <p className="mt-2">
                    Гарантія якості лабораторних тестів забезпечується
                    дотриманням міжнародних стандартів виконання лабораторних
                    досліджень. Лабораторія бере участь у Всеукраїнській
                    міжлабораторній програмі зовнішньої оцінки якості
                    лабораторних досліджень, RIQAS - Randox (Великобританія).
                  </p>
                  <p className="mt-2">
                    &quot;Довіра через якість&quot; - девіз і головна перевага
                    лабораторії.
                  </p>
                  <p className="mt-2">
                    Завдяки впровадженню системи контролю якості, будь-які
                    похибки, що виникають в процесі дослідження, оперативно
                    виявляються і виключаються.
                  </p>
                  <p className="mt-2">
                    У нашій лабораторії можна здати аналізи терміново і отримати
                    результати протягом 1-2 годин. Ми гарантуємо якісний
                    результат за мінімальний час! Сучасне обладнання і методики
                    проведення досліджень дозволяють впроваджувати нові форми
                    роботи. Завдяки цьому, наші пацієнти можуть здати аналізи
                    вдома або в офісі. Це важливо для людей з фізичними
                    обмеженнями руху.
                  </p>
                  <p className="mt-2">
                    На сьогодні широкий спектр медичних досліджень, сучасне
                    обладнання, вірогідність результатів, а також сумлінні
                    зусилля високопрофесійної команди співробітників лабораторії
                    VitaLab гарантують високу точність і оперативність отримання
                    результатів досліджень пацієнтів. Ми готові надати лікареві
                    максимум інформації для прийняття правильного рішення.
                  </p>
                  <p className="mt-2">
                    Ми доклали чимало зусиль для того, щоб лабораторія VitaLab
                    відповідала рівню європейських лабораторій.
                  </p>
                </div>
              </div>
            </div> */}
            <div>
              <h2 className="mb-6 px-4 text-xl font-normal leading-tight text-gray-900">
                Устаткування, яке використовується в лабораторії Vitalab
              </h2>

              <div
                id="equipment"
                className="grid gap-4 sm:grid-cols-2 md:grid-cols-3"
              >
                <div className="relative flex h-[290px] min-w-full items-center justify-center overflow-hidden rounded-lg bg-white text-white shadow-md">
                  <div className="h-full w-full p-6">
                    <Image
                      src={sysmexXN550}
                      alt=""
                      height={220}
                      className="absolute left-[50%] top-[45%] -translate-x-2/4 -translate-y-2/4"
                    />
                    <div className="absolute bottom-6 left-6 text-s font-medium text-slate-900">
                      Аналізатор гематологічний Sysmex XN-550 (SYSMEX, Японія)
                    </div>
                  </div>
                </div>
                <div className="relative flex h-[290px] min-w-full items-center justify-center overflow-hidden rounded-lg bg-white text-white shadow-md">
                  <div className="h-full w-full p-6">
                    <Image
                      src="/i/elite-5.png"
                      alt=""
                      height={220}
                      width={220}
                      className="absolute left-[50%] top-[35%] -translate-x-2/4 -translate-y-2/4"
                    />
                    <div className="absolute bottom-6 left-6 text-s font-medium text-slate-900">
                      Аналізатор гематологічний Elite5 (Erba Lachema / Чехія)
                    </div>
                  </div>
                </div>
                <div className="relative flex h-[290px] min-w-full items-center justify-center overflow-hidden rounded-lg bg-white text-white shadow-md">
                  <div className="h-full w-full p-6">
                    <Image
                      src="/i/alifax.jpg"
                      alt=""
                      height={180}
                      width={180}
                      className="absolute left-[50%] top-[42%] -translate-x-2/4 -translate-y-2/4"
                    />
                    <div className="absolute bottom-6 left-6 text-s font-medium text-slate-900">
                      Автоматичний аналізатор ШОЕ Alifax Roller 20 pn (Alifax,
                      Італія)
                    </div>
                  </div>
                </div>
                <div className="relative flex h-[290px] min-w-full items-center justify-center overflow-hidden rounded-lg bg-white text-white shadow-md">
                  <div className="h-full w-full p-6">
                    <Image
                      src="/i/urised.png"
                      alt=""
                      height={250}
                      width={250}
                      className="absolute left-[50%] top-[42%] -translate-x-2/4 -translate-y-2/4"
                    />
                    <div className="absolute bottom-6 left-6 text-s font-medium text-slate-900">
                      Аналізатор осаду сечі UriSed mini (Elektronika, Венгрія)
                    </div>
                  </div>
                </div>
                <div className="relative flex h-[290px] min-w-full items-center justify-center overflow-hidden rounded-lg bg-white text-white shadow-md">
                  <div className="h-full w-full p-6">
                    <Image
                      src="/i/ismart.jpg"
                      alt=""
                      height={150}
                      width={150}
                      className="absolute left-[50%] top-[42%] -translate-x-2/4 -translate-y-2/4"
                    />
                    <div className="absolute bottom-6 left-6 text-s font-medium text-slate-900">
                      Аналізатор електролітів i-Smart 30 PRO (i-SENS, Корея)
                    </div>
                  </div>
                </div>
                <div className="relative flex h-[290px] min-w-full items-center justify-center overflow-hidden rounded-lg bg-white text-white shadow-md">
                  <div className="h-full w-full p-6">
                    <Image
                      src="/i/coag.jpg"
                      alt=""
                      height={200}
                      width={200}
                      className="absolute left-[50%] top-[42%] -translate-x-2/4 -translate-y-2/4"
                    />
                    <div className="absolute bottom-6 left-6 text-s font-medium text-slate-900">
                      Автоматичний коагулометр COAG M (Diagon, Угорщина)
                    </div>
                  </div>
                </div>
                <div className="relative flex h-[290px] min-w-full items-center justify-center overflow-hidden rounded-lg bg-white text-white shadow-md">
                  <div className="h-full w-full p-6">
                    <Image
                      src="/i/Immulite.jpg"
                      alt=""
                      height={230}
                      width={230}
                      className="absolute left-[50%] top-[42%] -translate-x-2/4 -translate-y-2/4"
                    />
                    <div className="absolute bottom-6 left-6 text-s font-medium text-slate-900">
                      Аналізатор імунохемілюмінесцентний автоматичний Immulite
                      2000 XPi (Siemens, США)
                    </div>
                  </div>
                </div>
                <div className="relative flex h-[290px] min-w-full items-center justify-center overflow-hidden rounded-lg bg-white text-white shadow-md">
                  <div className="h-full w-full p-6">
                    <Image
                      src="/i/cobas.png"
                      alt=""
                      height={220}
                      width={220}
                      className="absolute left-[50%] top-[42%] -translate-x-2/4 -translate-y-2/4"
                    />
                    <div className="absolute bottom-6 left-6 text-s font-medium text-slate-900">
                      Імунохімічний аналізатор Roche Cobas e 411 (Roche,
                      Франція)
                    </div>
                  </div>
                </div>
                <div className="relative flex h-[290px] min-w-full items-center justify-center overflow-hidden rounded-lg bg-white text-white shadow-md">
                  <div className="h-full w-full p-6">
                    <Image
                      src="/i/exl.png"
                      alt=""
                      height={230}
                      width={230}
                      className="absolute left-[50%] top-[42%] -translate-x-2/4 -translate-y-2/4"
                    />
                    <div className="absolute bottom-6 left-6 text-s font-medium text-slate-900">
                      Біохімічний аналізатор Dimension EXL 200 (Siemens, США)
                    </div>
                  </div>
                </div>
                <div className="relative flex h-[290px] min-w-full items-center justify-center overflow-hidden rounded-lg bg-white text-white shadow-md">
                  <div className="h-full w-full p-6">
                    <Image
                      src="/i/BA400.jpg"
                      alt=""
                      height={150}
                      width={150}
                      className="absolute left-[50%] top-[42%] -translate-x-2/4 -translate-y-2/4"
                    />
                    <div className="absolute bottom-6 left-6 text-s font-medium text-slate-900">
                      Автоматичний біохімічний аналізатор ВА 400 (Biosystems,
                      Іспанія)
                    </div>
                  </div>
                </div>
                <div className="relative flex h-[290px] min-w-full items-center justify-center overflow-hidden rounded-lg bg-white text-white shadow-md">
                  <div className="h-full w-full p-6">
                    <Image
                      src="/i/qb.png"
                      alt=""
                      height={300}
                      width={300}
                      className="absolute left-[50%] top-[42%] -translate-x-2/4 -translate-y-2/4"
                    />
                    <div className="absolute bottom-6 left-6 text-s font-medium text-slate-900">
                      Імунохроматографічний аналізатор Quantum Blue® (BÜHLMANN,
                      Швейцарія)
                    </div>
                  </div>
                </div>
                <div className="relative flex h-[290px] min-w-full items-center justify-center overflow-hidden rounded-lg bg-white text-white shadow-md">
                  <div className="h-full w-full p-6">
                    <Image
                      src="/i/aspect.png"
                      alt=""
                      height={270}
                      width={270}
                      className="absolute left-[50%] top-[42%] -translate-x-2/4 -translate-y-2/4"
                    />
                    <div className="absolute bottom-6 left-6 text-s font-medium text-slate-900">
                      Експрес-аналізатор ASPECT Plus ST2 (Critical Diagnostics
                      (USA)
                    </div>
                  </div>
                </div>
                <div className="relative flex h-[290px] min-w-full items-center justify-center overflow-hidden rounded-lg bg-white text-white shadow-md">
                  <div className="h-full w-full p-6">
                    <Image
                      src="/i/star.png"
                      alt=""
                      height={270}
                      width={270}
                      className="absolute left-[50%] top-[42%] -translate-x-2/4 -translate-y-2/4"
                    />
                    <div className="absolute bottom-6 left-6 text-s font-medium text-slate-900">
                      Мікроскоп Primo Star (Carl Zeiss, Німеччина)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}

About.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default About
