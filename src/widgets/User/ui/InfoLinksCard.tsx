import { getDisplayLinks } from "@shared/utils"
import clsx from "clsx"
import styles from "./Styles.module.scss"
// eslint-disable-next-line
import Link from "next/link"
import { ReactNode } from "react"
import { InfoCard } from "./InfoCard"

type Props = {
  label: string
  links: string[] | null
  icon: ReactNode
}

export function InfoLinksCard({ label, links, icon }: Props) {
  const displayLinks = getDisplayLinks(links)

  return (
    <InfoCard
      label={label}
      icon={icon}
      value={
        displayLinks.length > 0
          ? displayLinks.map(({ url, displayText }, index) => (
              <Link
                href={url}
                key={index}
                target="_blank"
                className={clsx(styles.link, styles.info__link)}
              >
                {displayText}
              </Link>
            ))
          : null
      }
    />
  )
}
