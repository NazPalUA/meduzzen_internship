import { ListItem, ListItemAvatar, ListItemText } from "@mui/material"
import { Link } from "@navigation"
import { Avatar } from "@shared/components/ui"
import { Routes } from "@shared/constants"
import { ReactNode } from "react"
import { CompanyDetails } from "../../model"
import styles from "./CompanyListItem.module.scss"

type Company = Pick<
  CompanyDetails,
  "company_id" | "company_name" | "company_title" | "company_avatar"
>

type CompanyListItemProps = {
  company: Company
  secondaryAction?: ReactNode
}

export function CompanyListItem({ company, secondaryAction }: CompanyListItemProps) {
  const { company_id, company_name, company_title, company_avatar } = company

  const href = `${Routes.COMPANIES}/${company_id}`

  return (
    <ListItem secondaryAction={secondaryAction}>
      <ListItemAvatar>
        <Avatar src={company_avatar} alt={company_name} size="sm" />
      </ListItemAvatar>

      <ListItemText
        primary={
          <Link href={href} className={styles.link}>
            {company_name}
          </Link>
        }
        secondary={company_title}
      />
    </ListItem>
  )
}
