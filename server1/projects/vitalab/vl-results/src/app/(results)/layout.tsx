export default function TestLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex flex-col md:h-screen">
      {/* <section className="mx-auto flex w-full items-start px-4 md:w-1/3 md:items-center md:px-0">
        <div className="relative m-auto flex w-full min-w-min max-w-sm origin-left flex-row items-center bg-white py-8 text-black md:-left-4 md:mx-0 md:py-8">
          <div className="flex items-center space-x-1">
            <Image
              src={logo}
              alt="Logo"
              className="h-[24px] w-fit md:h-[40px]"
            />
          </div>
        </div>
      </section> */}
      <section className="flex w-full flex-1 flex-col items-center justify-center p-4 md:p-0">        
        {children}
      </section>
    </main>
  )
}
