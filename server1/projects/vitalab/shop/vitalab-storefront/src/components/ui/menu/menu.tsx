// import { styled } from '@stitches/react';
import { useRouter } from "next/router"
import Link from "next/link"
import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import s from "./menu.module.css"
import clsx from "clsx"
import { useState } from "react"

// const StyledNavigationMenuLink = styled(NavigationMenu.Link, {
//   textDecoration: 'none',
//   '&[data-active]': { textDecoration: 'underline' },
// });

const links = [
  { label: "Аналізи", href: "#" },
  { label: "Пункти", href: "#" },
  { label: "Як здавати", href: "#" },
  { label: "Результати", href: "#" },
]

const MenuLink = ({ href, ...props }) => {
  const router = useRouter()
  const isActive = router.asPath === href

  return (
    <Link href={href} passHref>
      <NavigationMenu.Link active={isActive} {...props} />
    </Link>
  )
}

const Menu = () => {
  const [offset, setOffset] = useState()
  const [list, setList] = useState()
  const [value, setValue] = useState()

  const onNodeUpdate = (trigger, itemValue) => {
    if (trigger && list && value === itemValue) {
      const listWidth = list.offsetWidth
      const listCenter = listWidth / 2

      const triggerOffsetRight =
        listWidth -
        trigger.offsetLeft -
        trigger.offsetWidth +
        trigger.offsetWidth / 2

      setOffset(Math.round(listCenter - triggerOffsetRight))
    } else if (value === "") {
      setOffset(null)
    }
    return trigger
  }

  return (
    // <NavigationMenu.Root>
    //   <NavigationMenu.List>
    //     <NavigationMenu.Item>
    //       <NavigationMenu.Trigger />
    //       <NavigationMenu.Content>
    //         <NavigationMenu.Link />
    //       </NavigationMenu.Content>
    //     </NavigationMenu.Item>
    //     <NavigationMenu.Item>
    //       <NavigationMenu.Link />
    //     </NavigationMenu.Item>
    //     <NavigationMenu.Item>
    //       <NavigationMenu.Trigger />
    //       <NavigationMenu.Content>
    //         <NavigationMenu.Sub>
    //           <NavigationMenu.List />
    //           <NavigationMenu.Viewport />
    //         </NavigationMenu.Sub>
    //       </NavigationMenu.Content>
    //     </NavigationMenu.Item>
    //     <NavigationMenu.Indicator />
    //   </NavigationMenu.List>
    //   <NavigationMenu.Viewport />
    // </NavigationMenu.Root>
    (<NavigationMenu.Root onValueChange={setValue}>
      <NavigationMenu.List
        ref={setList}
        className="hidden items-center justify-center md:flex"
      >
        {links.map((link) => (
          <NavigationMenu.Item key={link.label} value={link}>
            <MenuLink className={clsx(s.item, "block")} href={link.href}>
              {link.label}
            </MenuLink>
          </NavigationMenu.Item>
        ))}

        <NavigationMenu.Item value="test">
          <NavigationMenu.Trigger
            className={clsx(s.item, s.trigger)}
            ref={(node) => onNodeUpdate(node, "test")}
          >
            Про нас
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className={s.caret}
            >
              <path
                d="M4.18179 6.18181C4.35753 6.00608 4.64245 6.00608 4.81819 6.18181L7.49999 8.86362L10.1818 6.18181C10.3575 6.00608 10.6424 6.00608 10.8182 6.18181C10.9939 6.35755 10.9939 6.64247 10.8182 6.81821L7.81819 9.81821C7.73379 9.9026 7.61934 9.95001 7.49999 9.95001C7.38064 9.95001 7.26618 9.9026 7.18179 9.81821L4.18179 6.81821C4.00605 6.64247 4.00605 6.35755 4.18179 6.18181Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="absolute top-0 left-0 w-full sm:w-auto">
            <ul className="grid w-[300px] grid-cols-1 gap-x-3 bg-white p-6">
              <MenuLink href="/about">About</MenuLink>
              <MenuLink href="/about">About</MenuLink>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
      <div
        className="absolute left-0 flex h-full w-full justify-center"
        style={{ perspective: 2000 }}
      >
        <NavigationMenu.Viewport
          style={{
            // Avoid transitioning from initial position when first opening
            display: !offset ? "none" : undefined,
            transform: `translateX(${offset}px)`,
            top: "100%",
            width: "var(--radix-navigation-menu-viewport-width)",
            transition: "all 0.5s ease",
          }}
        />
      </div>
    </NavigationMenu.Root>)
  );
}

export default Menu
