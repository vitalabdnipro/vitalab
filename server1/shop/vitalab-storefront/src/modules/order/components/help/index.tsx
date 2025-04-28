import Link from "next/link";
import React from "react";

const Help = () => {
  return (
    <div>
      <h2 className="text-base-semi">Потрібна допомога?</h2>
      <div className="text-base-regular my-2">
        <ul className="flex flex-col gap-y-2">
          <li>
            <Link href="/contacts">Контакти</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Help;
