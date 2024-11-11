import { type SingleCompany } from "@entities/company"
import { Avatar } from "@mui/material"
import { Link } from "@navigation"
import { Routes } from "@shared/constants"
import Image from "next/image"
import styles from "./CompanyCard.module.scss"

export function CompanyCard({ company }: { company: SingleCompany }) {
  const { company_name, company_title, company_avatar, company_id } = company

  return (
    <Link href={`${Routes.COMPANIES}/${company_id}`} className={styles.container}>
      <Avatar>
        {company_avatar ? (
          <Image src={company_avatar} fill sizes="40px" alt={company_name} />
        ) : (
          company_name[0]
        )}
      </Avatar>
      <div className={styles.details}>
        <strong className={styles.name}>{company_name}</strong>
        {company_title && <div className={styles.title}>{company_title}</div>}
      </div>
    </Link>
  )
}
