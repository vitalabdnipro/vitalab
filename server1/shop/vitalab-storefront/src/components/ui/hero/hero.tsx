import React from "react"
import Link from "next/link"
import {
  Advantage,
  Breadcrumbs,
  Button,
  SectionBackgroundMask,
  Service,
  ServiceCard,
  Slider,
} from "@components/ui"
import cn, { clsx } from "clsx"

import covid19 from "../../../../public/icons/covid19.svg"
import PhoneDropdown from "../phone-dropdown"
import s from "./hero.module.css"

const services = [
  {
    icon: covid19,
    title: "COVID-19",
    body: "Дізнайтеся, чи є коронавірусна інфекція чи імунітет до неї.",
    href: "#",
  },
  {
    icon: covid19,
    title: "Перелік аналізів",
    body: "Дізнайтеся, чи є коронавірусна інфекція чи імунітет до неї.",
    href: "#",
  },
  {
    icon: covid19,
    title: "Виклик до дому",
    body: "Дізнайтеся, чи є коронавірусна інфекція чи імунітет до неї.",
    href: "#",
  },
]

const Card = () => {
  return (
    <div
      className={clsx(
        s.card,
        "cursor-pointer transition ease-hover hover:shadow-2xl"
      )}
    >
      {/* .NewsroomContactCard__section */}
      <section className="grid gap-y-0.5">
        <div className="flex items-center justify-between">
          <h2 className="text-m font-semibold leading-6 tracking-[.2px] text-title">
            Адреси та час роботи
          </h2>
          <div className="text-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
              />
            </svg>
          </div>
        </div>
        <div className="mt-6 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="mr-2 h-10 w-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>
          <div className="text-3xl font-semibold">16</div>
        </div>
        <div className="mt-1 text-m">Лабораторних центрів</div>
      </section>
    </div>
  )
}

const Hero = () => {
  // ProductHeroSection
  return (
    <section className={s.root}>
      {/* Section__masked */}
      <div className="overflow-hidden">
        {/* Section__backgroundMask */}
        <SectionBackgroundMask />
        {/* Section__container */}
        <div className="relative z-10 flex justify-center">
          {/* Section__layoutContainer */}
          <div className={s.layoutContainer}>
            {/* Section__layout */}
            <div className={s.layout}>
              {/* RowLayout */}
              <div className={cn(s.rowLayout)}>
                {/* ProductNav */}
                <Breadcrumbs />
                {/* ProductHeroSection__content */}
                <div
                  className={cn(s.rowLayout)}
                  style={
                    {
                      "--row-layout-gap": `var(--row-layout-gap-xlarge)`,
                    } as React.CSSProperties
                  }
                >
                  {/* Newsroom Featured Articles Carousel */}
                  <Slider />
                  {/* Services */}
                  <div className={cn(s.rowLayout)}>
                    <div className="grid items-start gap-y-8">
                      <div className="grid">
                        <header className="relative grid max-w-[810px] gap-y-6 px-4 sm:pr-16">
                          <h3 className="text-base font-semibold text-orange-600">
                            Чому Vitalab
                          </h3>
                          <h2 className="text-3xl font-semibold text-vl-green-dark">
                            <span className="font-bold">Vitalab</span> - це
                            сучасна українська лабораторія, акредитована за
                            міжнародним стандартом ISO 15189:2022
                          </h2>
                        </header>
                      </div>
                    </div>
                    {/* ColumnLayout */}
                    <div className="grid items-start gap-y-8 sm:grid-cols-2 md:grid-cols-4">
                      {/* Copy variant--Detail */}
                      <Advantage
                        header="Якість"
                        body={
                          <p>
                            Багаторівневий контроль якості
                            <br />
                            Сучасне лабораторне обладнання
                          </p>
                        }
                      />
                      <Advantage
                        header="Зручність"
                        body={
                          <p>
                            19 пунктів забору, виїзд додому
                            <br />
                            Замовлення, оплата і результати онлайн
                          </p>
                        }
                      />
                      <Advantage
                        header="Доступність"
                        body={
                          <p>
                            Знижки військовим, ВПО, пенсіонерам. Пакетні та
                            акційні пропозиції
                          </p>
                        }
                      />
                      <Advantage
                        header="Досвід"
                        body={
                          <p>
                            400 тис.+ досліджень на рік
                            <br />
                            90 тис.+ пацієнтів щороку
                          </p>
                        }
                      />
                      {/* {services.map((service) => (
                        <Service
                          key={service.title}
                          icon={service.icon}
                          title={service.title}
                          body={service.body}
                          href={service.href}
                        />
                      ))}
                      <Card /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
