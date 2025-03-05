import s from "./section-background-mask.module.css"

const SectionBackgroundMask = () => {
  return (
    <div className="absolute w-full h-full overflow-visible">
      {/* 
        Section__backgrounds
        transform-origin: 100% 0;
        transform: skewY(0);
      */}
      <div className="relative h-full w-full top-0 left-0 bg-alice-blue overflow-hidden">
        {/* Guides 
          max-width: calc(100vw - var(--scrollbarWidth);
        */}
        <div className="absolute h-full w-full top-0 left-0 px-4 pointer-events-none">
          {/* Guides__container */}
          <div className={s.guides__container}>
            {/* Guides__guide */}
            <div className={s.guides__guide}></div>
            <div className={s.guides__guide}></div>
            <div className={s.guides__guide}></div>
            <div className={s.guides__guide}></div>
            <div className={s.guides__guide}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SectionBackgroundMask
