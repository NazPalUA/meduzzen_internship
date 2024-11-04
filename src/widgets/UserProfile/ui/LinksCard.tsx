import { InfoCard } from "./InfoCard"
import styles from "./LinksCard.module.scss"

// eslint-disable-next-line
import Link from "next/link"

type DisplayLink = {
  url: string
  displayText: string
}

type LinksCardProps = {
  label: string
  links: string[] | null
  icon: React.ReactNode
}

export function LinksCard({ label, links, icon }: LinksCardProps) {
  const displayLinks: DisplayLink[] = links
    ? links
        .map((link) => {
          try {
            const url = new URL(link)
            return {
              url: url.toString(),
              displayText: url.hostname.replace(/^www\./, ""),
            }
          } catch {
            return null
          }
        })
        .filter((link) => link !== null)
    : []

  return (
    <InfoCard
      label={label}
      icon={icon}
      value={
        displayLinks.length > 0
          ? displayLinks.map(({ url, displayText }, index) => (
              <Link href={url} key={index} target="_blank" className={styles.link}>
                {displayText}
              </Link>
            ))
          : null
      }
    />
  )
}
