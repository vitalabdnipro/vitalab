import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button, Card, Text } from "@components/ui"
import { cn } from "@utils/cn"
import Carousel from "nuka-carousel"

import s from "./slider.module.css"

const data = [
  {
    label: "ЗУСТРІЧАЙТЕ ВЕСНУ ЗДОРОВИМИ!",
    description: (
      <div>
        <p>-40% на великий чек-ап</p>
      </div>
    ),
    img: "/b/b_01032025.jpg",
    link: "/news/check-up",
    linkText: "Детальніше",
    type: "Акція",
  },
  {
    label: "КОЛИ СИЛИ НА НУЛІ",
    description: (
      <div>
        <p>Перевіртесь на дефіцити зі знижкою 20%!</p>
      </div>
    ),
    img: "/b/b_01032025_1.jpg",
    link: "/news/fatigue",
    linkText: "Детальніше",
    type: "Акція",
  },
  {
    label: "ЗАСТУДИЛИСЬ? ОДУЖУЙТЕ!",
    description: (
      <div>
        <p>Перевірте свій стан при ГРВІ зі знижкою 25%!</p>
      </div>
    ),
    img: "/b/b_30112024.jpg",
    link: "/news/get-well",
    linkText: "Детальніше",
    type: "Акція",
  },
  // {
  //   label: "ДО ШКОЛИ – БЕЗ РИЗИКУ!",
  //   description: (
  //     <div>
  //       <p>Готуйтеся до школи разом із Vitalab</p>
  //     </div>
  //   ),
  //   img: "/b/b_19082024.jpg",
  //   link: "/news/school",
  //   linkText: "Детальніше",
  //   type: "Акція",
  // },
  {
    label: "ЧИ ДОСТАТНЬО ВІТАМІНУ D?",
    description: (
      <div>
        <p>Перевірте організм на дефіцит вітаміну D зі знижкою!</p>
      </div>
    ),
    img: "/b/b_30082024_1.jpg",
    link: "/news/starts-d",
    linkText: "Детальніше",
    type: "Акція",
  },
  {
    label: "СЕРЦЕ – МОТОР ВАШОГО ОРГАНІЗМУ",
    description: (
      <div>
        <p>7 показників роботи серця і судин зі знижкою!</p>
      </div>
    ),
    img: "/b/b_30082024_4.jpg",
    link: "/news/heart",
    linkText: "Детальніше",
    type: "Акція",
  },
  {
    label: "ПЕЧІНКОВІ ПРОБИ",
    description: (
      <div>
        <p>4 показники здоров’я печінки зі знижкою!</p>
      </div>
    ),
    img: "/b/b_30082024_3.jpg",
    link: "/news/healthy-liver",
    linkText: "Детальніше",
    type: "Акція",
  },
  {
    label: "ТИРЕОЇДНИЙ СКРИНІНГ",
    description: (
      <div>
        <p>2 показники роботи щитовидної залози зі знижкою!</p>
      </div>
    ),
    img: "/b/b_30052024_5.jpg",
    link: "/news/thyroid-screening",
    linkText: "Детальніше",
    type: "Акція",
  },
  {
    label: "ІМУНІТЕТ У ПОРЯДКУ!",
    description: (
      <div>
        <p>Скринінг стану імунітету зі знижкою!</p>
      </div>
    ),
    img: "/b/b_30082024_2.jpg",
    link: "/news/immunity-ok",
    linkText: "Детальніше",
    type: "Акція",
  },
  {
    label: "Ми завжди поруч",
    description: "Виклик медсестри додому чи в офіс",
    img: "/b/b_1.jpg",
    link: "/news/we-are-always-there",
    linkText: "Детальніше",
    type: "Новина",
  },
  //
]

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0)
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  const slides = data.slice(0, data.length).map((slide, index) => (
    <div
      key={slide?.label}
      className="grid min-w-full items-start gap-y-8 px-4 sm:grid-cols-1 lg:grid-cols-2 lg:px-10"
    >
      <section className="grid gap-4">
        {slide?.type && (
          <Text variant="accentedHeading">
            <span className="text-orange-600">{slide?.type}</span>
          </Text>
        )}
        <h2 className="h-[85px] px-4 text-[24px] leading-[1.29] tracking-[-0.1px] text-slate-900 sm:pr-16 sm:text-4xl sm:leading-[1.26] sm:tracking-[.2px] md:h-auto lg:pr-28">
          <Link
            href={slide?.link}
            className="link font-bold text-vl-green-dark hover:opacity-60"
          >
            {slide?.label}
          </Link>
        </h2>
        <div className="h-[85px] max-w-[calc(calc(1080px*0.25)*3)] px-4 text-lg font-medium leading-[1.555555556] tracking-[.2px] text-[#425466] sm:pr-8 md:h-auto">
          <div>{slide?.description}</div>
        </div>
        {/* CtaGroup */}
        <div className="flex min-h-[24px] items-center pl-4">
          {/* <Button className="text-white bg-[#635bff] hover:bg-slate-900 hover:opacity-100">Start now&nbsp;</Button> */}
          {slide?.linkText && (
            <Link href={slide?.link}>
              <Button
                variant="naked"
                className="text-orange-600 hover:text-slate-900"
              >
                {slide?.linkText}&nbsp;
              </Button>
            </Link>
          )}
        </div>
      </section>
      <Card shadow="medium" className="mt-auto aspect-540/368 bg-white">
        {/* NewsroomIndexCarousel__pictureCardOverlay */}
        <picture className="flex h-full w-full max-w-none">
          <Image
            src={slide.img}
            // layout="fill"
            width={540}
            height={368}
            loading="eager"
            priority={true}
            quality={100}
            // objectFit="contain"
            alt=""
            // className="absolute top-0 left-0 w-full h-full"
            draggable="false"
          />
        </picture>
      </Card>
    </div>
    // <img
    //   src={`https://via.placeholder.com/400/${color}/ffffff/&text=slide${
    //     index + 1
    //   }`}
    //   alt={`Slide ${index + 1}`}
    //   key={color}
    //   onClick={() => handleImageClick()}
    //   style={{
    //     height: heightMode === "current" ? 100 * (index + 1) : 400,
    //   }}
    // />
  ))
  return (
    <section className={s.root}>
      {/* NewsroomIndexCarousel__container */}
      <div className={s.container}>
        {/* NewsroomIndexCarousel__track */}
        {/* <div className={s.track}> */}
        <Carousel
          wrapAround={true}
          withoutControls={true}
          autoplay={true}
          autoplayInterval={8000}
          speed={1000}
          slideIndex={slideIndex}
          beforeSlide={(currentSlideIndex, endSlideIndex) =>
            setCurrentSlideIndex(endSlideIndex)
          }
          // afterSlide={(index) => {
          //   setCurrentSlideIndex(index)
          // }}
          className={s.carousel}
        >
          {slides}
        </Carousel>
        {/* </div> */}
      </div>
      {/* <div
        className={s.nav}
        style={
          {
            "--carousel-nav-current-index": `${currentSlideIndex}`,
          } as React.CSSProperties
        }
      >
        <div className={s.desktopNav}>
          {slides.map((slide, index) => (
            <button
              key={index}
              className={s.button}
              onClick={() => {
                setSlideIndex(index)
              }}
            ></button>
          ))}
          <span className={s.line}></span>
        </div>
      </div> */}
      <div className="mb-20 grid w-full grid-cols-4 md:mb-0">
        <nav className="col-start-1 col-end-6 mx-auto mt-12 flex w-full gap-1">
          {slides.map((slide, index) => (
            <button
              key={index}
              className={cn("h-1 w-full bg-[#e7ecf1]", {
                "bg-[#00483a]": index === currentSlideIndex,
              })}
              onClick={() => {
                setSlideIndex(index)
              }}
            ></button>
          ))}
        </nav>
      </div>
    </section>
  )
}

export default Slider
