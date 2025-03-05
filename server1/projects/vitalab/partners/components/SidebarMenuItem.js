import Link from "next/link";

const SidebarMenuItem = ({ href, icon, text }) => {
  return (
    <div>
      <Link href={href} legacyBehavior>
        <a className="py-1.5 px-3 my-0.5 rounded-base flex items-center">
          <span className="items-start">{icon}</span>
          <span className="ml-3">{text}</span>
        </a>
      </Link>
    </div>
  );
};

export default SidebarMenuItem;
