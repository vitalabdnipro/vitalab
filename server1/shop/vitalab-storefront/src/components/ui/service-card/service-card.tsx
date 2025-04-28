import clsx from "clsx";
import Link from "next/link";

const ServiceCard = (props) => {
  return (
    <Link href={props.link}>
      <div className="group min-w-[calc(1080px_/_4)] cursor-pointer">
        <div className=" relative h-[160px] w-full shrink-0 text-white md:w-[244px]">
          {/* .UpdateCard__background */}
          <div
            className={clsx(
              "absolute top-0 right-0 left-0 bottom-0 transition duration-200 group-hover:scale-x-[1.08403] group-hover:scale-y-[1.125] group-hover:opacity-100",
              "before:absolute before:top-0 before:left-0 before:h-full before:w-full before:overflow-hidden before:rounded-lg before:shadow-card-small",
              "after:absolute after:top-0 after:left-0 after:h-full after:w-full after:overflow-hidden after:rounded-lg after:bg-[#00483a]"
            )}
          ></div>
          {/* .UpdateCard__content */}
          <div className="relative flex h-full w-full max-w-[400px] flex-col p-4">
            <header className="mb-2">
              <h1 className="text-lg leading-[1.555555556]">{props.title}</h1>
            </header>
            {props.children}
            {/* UpdateCard__footer */}
            <footer className="flex flex-auto items-end">
              <button className="group relative inline-flex cursor-pointer appearance-none items-center whitespace-nowrap text-m font-semibold leading-[1.6] text-white outline-none">
                {props.buttonText}
                <svg
                  className="-mr-1 ml-2 mt-0.5 stroke-white stroke-2"
                  fill="none"
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  aria-hidden="true"
                >
                  <path
                    className="opacity-0 transition ease-hover group-hover:opacity-100"
                    d="M0 5h7"
                  ></path>
                  <path
                    className="transition ease-hover group-hover:translate-x-[3px]"
                    d="M1 1l4 4-4 4"
                  ></path>
                </svg>
              </button>
            </footer>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
