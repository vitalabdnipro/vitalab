import clsx from "clsx";
import { useCollections } from "medusa-react";
import Link from "next/link";
import CountrySelect from "../country-select";

const FooterNav = () => {
  const { collections } = useCollections();

  return (
    <div className="content-container flex flex-col gap-y-8 pt-16 pb-8">
      <div className="xsmall:flex-row flex flex-col items-start justify-between gap-y-6">
        <div>
          <Link href="/" legacyBehavior>
            <a className="text-xl-semi uppercase">Acme</a>
          </Link>
        </div>
        <div className="text-small-regular grid grid-cols-2 gap-x-16">
          <div className="flex flex-col gap-y-2">
            <span className="text-base-semi">Collections</span>
            <ul
              className={clsx("grid grid-cols-1 gap-y-2", {
                "grid-cols-2": (collections?.length || 0) > 4,
              })}
            >
              {collections?.map((c) => (
                <li key={c.id}>
                  <Link href={`/collections/${c.id}`} legacyBehavior>
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-y-2">
            <span className="text-base-semi">Medusa</span>
            <ul className="grid grid-cols-1 gap-y-2">
              <li>
                <a
                  href="https://github.com/medusajs"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://docs.medusajs.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/medusajs/nextjs-starter-medusa"
                  target="_blank"
                  rel="noreferrer"
                >
                  Source code
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="xsmall:items-center xsmall:flex-row xsmall:items-end xsmall:justify-between flex flex-col-reverse justify-center gap-y-4">
        <span className="text-xsmall-regular text-gray-500">
          © Copyright 2022 ACME
        </span>
        <div className="xsmall:justify-end flex min-w-[316px]">
          <CountrySelect />
        </div>
      </div>
    </div>
  );
};

export default FooterNav;
