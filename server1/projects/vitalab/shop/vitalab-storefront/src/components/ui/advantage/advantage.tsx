const Advantage = (props) => {
  return (
    <div className="grid gap-y-2">
      <header className="relative grid max-w-[810px] gap-y-2 px-4">
        <h1 className="relative text-m font-bold leading-snug text-[#1e3932] before:absolute before:top-[3px] before:-left-4 before:block before:h-[15px] before:w-px before:bg-orange-500">
          {props.header}
        </h1>
      </header>
      <div className="max-w-[810px] px-4 text-s sm:pr-8">{props.body}</div>
    </div>
  )
}

export default Advantage
