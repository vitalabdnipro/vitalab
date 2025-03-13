"use client"

import Image from "next/image"
import { ExternalLink, MapPin, Phone, X } from "lucide-react"

import { useModal } from "~/hooks/use-modal"
import { Button } from "~/components/ui/button"
import * as Modal from "~/components/ui/modal"

import mastercard from "../../public/mastercard-logo.svg"
import visa from "../../public/visa-logo.svg"

export const Footer = () => {
  const [active, open, close] = useModal()
  const [activePayModal, openPayModal, closePayModal] = useModal()
  const [activeAboutModal, openAboutModal, closeAboutModal] = useModal()

  return (
    <footer className="mt-56 w-full sm:mt-0">
      <div className="geist-wrapper">
        <div className="flex w-full flex-col gap-1">
          <div className="text-center text-sm text-gray-500 sm:text-left">
            © 2023 Vitalab
          </div>
          <div className="h-10 items-center md:flex md:justify-between">
            <div className="flex items-center justify-center space-x-3">
              <Image src={visa} alt={""} className="w-[72px]" />
              <Image src={mastercard} alt="" className="w-[72px]" />
            </div>
            <div className="mt-8 sm:mt-0">
              <ul className="flex flex-col items-center gap-3 text-sm text-gray-500 sm:divide-x sm:divide-solid md:flex-row">
                <li>
                  <a
                    className="flex items-center"
                    href="/privacy-policy.pdf"
                    target="_blank"
                  >
                    Політика конфіденційності{" "}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </li>
                <li className="pl-3">
                  <a
                    className="flex items-center"
                    href="/offer.pdf"
                    target="_blank"
                  >
                    Угода користувача <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </li>
                {/* <li className="pl-3">
                  <a
                    className="flex items-center"
                    href="/price.pdf"
                    target="_blank"
                  >
                    Ціни <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </li> */}
                <li className="pl-3">
                  <button onClick={openPayModal}>Оплата</button>
                  <Modal.Root
                    active={activePayModal}
                    onClickOutside={closePayModal}
                  >
                    <Modal.Body>
                      <Modal.Header>
                        <Modal.Title>
                          Вартість послуг та порядок оплати
                        </Modal.Title>
                      </Modal.Header>
                      <div className="mt-4 text-xs">
                        <ul className="space-y-1">
                          <li>
                            1.1 Вартість Послуг зазначається у замовленні із
                            унікальним номером, яке попередньо сформоване та
                            перевірене Замовником (Пацієнтом) особисто на пункті
                            забору біоматеріалу, або на сайті
                            https://vitalab.com.ua
                          </li>
                          <li>
                            1.2 Оплата Послуг здійснюється Замовником в
                            національній валюті України - гривні, шляхом
                            здійснення грошового переказу у спосіб,
                            запропонований Виконавцем на Сайті Виконавця, в тому
                            числі за допомогою систем дистанційного
                            обслуговування, зокрема на веб-сторінці
                            https://pay.vitalab.com.ua
                          </li>
                          <li>
                            1.3 Виконавець забезпечує надання замовлених Послуг
                            Пацієнту після їх попередньої та повної оплати.
                          </li>
                          <li>
                            1.4 Замовник несе відповідальність за правильність
                            здійснених ним платежів.
                          </li>
                          <li>
                            1.5 Замовник (Пацієнт) забезпечує можливість взяття
                            біологічного матеріалу Пацієнта працівниками
                            Виконавця в пункті забору біоматеріалу Виконавця
                            протягом 30-ти календарних днів з моменту оформлення
                            та оплати Замовлення, або в інший строк, зазначений
                            Виконавцем у Замовленні. В разі невиконання
                            Замовником даного зобов’язання Виконавець має право
                            анулювати його Замовлення, при цьому, кошти оплачені
                            за Послуги, не повертаються Замовнику.
                          </li>
                          <li>
                            1.6. Виконавець має право анулювати Замовлення
                            повністю чи частково при настанні обставин, що
                            унеможливлюють надання Послуг, попередньо
                            повідомивши Замовника (Пацієнта) про настання таких
                            обставин.
                          </li>
                          <li>
                            1.7 У випадку анулювання Замовником оформленого
                            Замовлення протягом строку дії Замовлення та/або у
                            випадку анулювання Замовлення Виконавцем, вартість
                            оплачених, але не наданих Послуг може бути повернута
                            Замовнику у порядку, передбаченому чинним
                            законодавством України, за його письмовою заявою,
                            протягом 30 робочих днів з моменту прийняття такого
                            рішення Виконавцем.
                          </li>
                          <li>
                            1.8 Заява на повернення грошових коштів оформлюється
                            у вигляді паперового документа, який подається
                            представнику Виконавця за адресою надання Послуг
                            Виконавця (м. Дніпро, вул. Херсонська, 10А) або
                            направляється рекомендованою поштою на адресу
                            Виконавця разом із копією документа, що посвідчує
                            особу Замовника, копією довідки про присвоєння
                            ідентифікаційного коду, копією рахунку-замовлення,
                            копією платіжного документа, який підтверджує
                            здійснення оплати Послуг.
                          </li>
                        </ul>
                      </div>
                    </Modal.Body>
                    <div
                      className="absolute right-1 top-1"
                      onClick={closePayModal}
                    >
                      <X className="transition-opacity hover:opacity-60" />
                    </div>
                  </Modal.Root>
                </li>
                {/* <li className="pl-3">
                  <button onClick={openAboutModal}>Про нас</button>
                  <Modal.Root
                    active={activeAboutModal}
                    onClickOutside={closeAboutModal}
                  >
                    <Modal.Body>
                      <Modal.Header>
                        <Modal.Title>Про нас</Modal.Title>
                      </Modal.Header>
                      <div className="mt-4 flex flex-col gap-2">
                        <p>
                          &quot;Лабораторія для всієї родини&quot; - це поняття
                          закладено в логотипі не випадково: максимальна
                          відкритість, оперативний зворотний зв&apos;язок з
                          лікуючим лікарем у разі виявлення виходячих за рамки
                          норми результатів досліджень, відповідальність за
                          якість досліджень перед пацієнтами які користуються
                          нашими послугами, а також надійність і довіра - все як
                          у родині. Адже клінічні лабораторні дослідження
                          являють собою одну з форм об&apos;єктивної оцінки
                          стану здоров&apos;я людини.
                        </p>
                        <p>
                          Бажання створити багатопрофільну лабораторію VitaLab
                          сімейного типу виникло дуже давно, і для цього був ряд
                          обґрунтованих передумов.
                        </p>
                        <p>
                          Маючи особистий досвід роботи (більше 17 років) в
                          клініко-діагностичної лабораторії педіатричної служби,
                          стало зрозуміло, що найчастіше недостатньо мати тільки
                          клінічну картину хвороби дитини. У формуванні точного
                          діагнозу велику роль відіграє анамнез батьків дитини.
                          Отже, виникла необхідність призначати лабораторні
                          дослідження дітям і їх батькам, для повноти картини
                          обстежувати цілі сім&apos;ї.
                        </p>
                        <p>
                          Піклуйтеся Вашим здоров&apos;ям разом з лабораторією
                          VitaLab!
                        </p>
                        <p>
                          Лабораторія VitaLab - не мережева лабораторія! Ми дуже
                          вибірково пропонуємо співпрацю медико-діагностичним
                          центрам міста і області, які, так само як і ми,
                          орієнтовані на надання професійної, своєчасної
                          допомоги своїм пацієнтам.
                        </p>
                      </div>
                    </Modal.Body>
                    <div
                      className="absolute right-1 top-1"
                      onClick={closeAboutModal}
                    >
                      <X className="transition-opacity hover:opacity-60" />
                    </div>
                  </Modal.Root>
                </li> */}
                <li className="pl-3">
                  <button onClick={open}>Контакти</button>
                  <Modal.Root active={active} onClickOutside={close}>
                    <Modal.Body>
                      <Modal.Header>
                        <Modal.Title>Контакти</Modal.Title>
                      </Modal.Header>
                      <span className="mt-4 inline-flex items-center">
                        <MapPin className="mr-2 h-4 w-4" /> вул. Херсонська, 10а
                        (Медичний центр), 3 поверх, Дніпро
                      </span>
                      <span className="mt-2 inline-flex items-center">
                        <Phone className="mr-2 h-4 w-4" />
                        <ul className="flex flex-col gap-1 sm:flex-row">
                          <li>
                            <a href="tel:+380673105227">(067) 310-52-27,</a>
                          </li>
                          <li>
                            <a href="tel:+380503607575">(050) 360-75-75,</a>
                          </li>
                          <li>
                            <a href="tel:+380632510338">(063) 251-03-38</a>
                          </li>
                        </ul>
                      </span>
                    </Modal.Body>
                    <div className="absolute right-1 top-1" onClick={close}>
                      <X className="transition-opacity hover:opacity-60" />
                    </div>
                  </Modal.Root>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="geist-wrapper">
        <div className=" flex flex-col gap-1">
          <div className="text-sm text-gray-500">© 2023 Vitalab</div>
          <div className="flex h-10 items-center justify-between">
            <div className="flex items-center space-x-3">
              <Image src={visa} alt={""} className="w-full" />
              <Image src={mastercard} alt="" className="w-full" />
            </div>
            <div>
              <ul className="flex items-center gap-3 divide-x divide-solid text-sm text-gray-500">
                <li>
                  <a
                    className="flex items-center"
                    href="/privacy-policy.pdf"
                    target="_blank"
                  >
                    Політика конфіденційності{" "}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </li>
                <li className="pl-3">
                  <a
                    className="flex items-center"
                    href="/offer.pdf"
                    target="_blank"
                  >
                    Угода користувача <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </li>
                <li className="pl-3">
                  <button onClick={openPayModal}>Оплата</button>
                  <Modal.Root
                    active={activePayModal}
                    onClickOutside={closePayModal}                    
                  >
                    <Modal.Body>
                      <Modal.Header>
                        <Modal.Title>
                          Вартість послуг та порядок оплати
                        </Modal.Title>
                      </Modal.Header>
                      <div className="mt-4 text-xs">
                        <ul className="space-y-1">
                          <li>
                            1.1 Вартість Послуг вказані в чинному Прайс-листі
                            Виконавця та розміщені на Сайті Виконавця за
                            адресою: https://pay.vitalab.com.ua.
                          </li>
                          <li>
                            1.2 Виконавець має право в односторонньому порядку
                            змінювати ціни в Прайс-листі. Датою вступу в силу
                            нових цін є дата їх публікації на Сайті Виконавця. У
                            разі фактичної оплати послуг Замовником, при зміні
                            ціни у день звернення Пацієнта, вартість послуг не
                            перераховується.
                          </li>
                          <li>
                            1.3 Оплата Послуг здійснюється Замовником в
                            національній валюті України - гривні, шляхом
                            здійснення грошового переказу у спосіб,
                            запропонований Виконавцем на Сайті Виконавця, в тому
                            числі за допомогою систем дистанційного
                            обслуговування.
                          </li>
                          <li>
                            1.4 Виконавець забезпечує надання замовлених Послуг
                            Пацієнту після їх попередньої та повної оплати.
                          </li>
                          <li>
                            1.5 Замовник несе відповідальність за правильність
                            здійснених ним платежів.
                          </li>
                          <li>
                            1.6 Забезпечити можливість здійснення взяття
                            біологічного матеріалу Пацієнта працівниками
                            Виконавця в приміщенні Виконавця протягом 30-ти
                            календарних днів з моменту оформлення та оплати
                            Замовлення, або в інший строк, зазначений Виконавцем
                            у Замовленні. В разі невиконання Замовником даного
                            зобов’язання Виконавець має право анулювати його
                            Замовлення, при цьому, кошти оплачені за Послугу не
                            повертаються Замовнику.
                          </li>
                          <li>
                            1.7 У випадку анулювання Замовником оформленого
                            Замовлення протягом строку дії Замовлення та/або у
                            випадку анулювання Замовлення Виконавцем відповідно
                            до п. 1.6. Договору вартість оплачених, але не
                            наданих Послуг може бути повернута Замовнику за його
                            письмовою заявою у формі, в якій було здійснено
                            оплату таких Послуг, протягом 30 робочих днів з
                            моменту прийняття такого рішення Виконавцем.
                          </li>
                          <li>
                            1.8 Заява на повернення грошових коштів у випадках
                            передбачених п. 1.7. Договору оформляється у вигляді
                            паперового документа, який подається представнику
                            Виконавця за адресою надання Послуг Виконавця (м.
                            Дніпро, вул. Херсонська, 10А) або направляється
                            рекомендованою поштою на адресу Виконавця разом із
                            копією документа, що посвідчує особу Замовника,
                            копією довідки про присвоєння ідентифікаційного коду
                            та копією платіжного документа, який підтверджує
                            здійснення оплати Послуг.
                          </li>
                        </ul>
                      </div>
                    </Modal.Body>
                    <div
                      className="absolute right-1 top-1"
                      onClick={closePayModal}
                    >
                      <X className="transition-opacity hover:opacity-60" />
                    </div>
                  </Modal.Root>
                </li>
                <li className="pl-3">
                  <button onClick={open}>Контакти</button>
                  <Modal.Root active={active} onClickOutside={close}>
                    <Modal.Body>
                      <Modal.Header>
                        <Modal.Title>Контакти</Modal.Title>
                      </Modal.Header>
                      <span className="mt-4 inline-flex items-center">
                        <MapPin className="mr-2 h-4 w-4" /> вул. Херсонська, 10а
                        (Медичний центр), 3 поверх, Дніпро
                      </span>
                      <span className="mt-2 inline-flex items-center">
                        <Phone className="mr-2 h-4 w-4" />
                        <ul className="flex gap-1">
                          <li>
                            <a href="tel:+380673105227">(067) 310-52-27,</a>
                          </li>
                          <li>
                            <a href="tel:+380503607575">(050) 360-75-75,</a>
                          </li>
                          <li>
                            <a href="tel:+380632510338">(063) 251-03-38</a>
                          </li>
                        </ul>
                      </span>
                    </Modal.Body>
                    <div className="absolute right-1 top-1" onClick={close}>
                      <X className="transition-opacity hover:opacity-60" />
                    </div>
                  </Modal.Root>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div> */}
    </footer>
  )
}
