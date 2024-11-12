"use client"

import { useSession } from "@entities/session"
import { useLeaveCompanyMutation } from "@features/action"
import { useGetUserCompaniesListQuery, UserCompany } from "@features/user-data"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"
import { Button, Card, CardContent, CardHeader } from "@mui/material"
import { Link } from "@navigation"
import { MenuItem, SettingsMenu } from "@shared/components/SettingsMenu"
import { Avatar, ContentDialog, ErrorMessage, LoadingSpinner } from "@shared/components/ui"
import { Action } from "@shared/constants"
import { useDialog, useToaster } from "@shared/hooks"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import styles from "./UserCompanies.module.scss"

export function UserCompanies({ userId }: { userId: string }) {
  const t = useTranslations("ProfilePage")

  const { user: currentUser } = useSession()
  const params = useParams()

  const profileUserId = params.userId

  if (!currentUser || currentUser.user_id.toString() !== profileUserId) {
    return null
  }

  return (
    <Card>
      <CardHeader title={<h3>{t("companies")}</h3>} />
      <CardContent className={styles.contentContainer}>
        <CompaniesList userId={userId} />
      </CardContent>
    </Card>
  )
}

function CompaniesList({ userId }: { userId: string }) {
  const { data: companies, isLoading, isError } = useGetUserCompaniesListQuery(userId)

  const t = useTranslations("ProfilePage")

  if (isLoading) return <LoadingSpinner />
  if (isError) return <ErrorMessage />
  if (!companies?.length) return <p>{t("noCompanies")}</p>

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {companies?.map((company) => <CompanyCard key={company.company_id} company={company} />)}
    </div>
  )
}

function CompanyCard({ company }: { company: UserCompany }) {
  const [leaveCompany] = useLeaveCompanyMutation()

  const { toastError, toastSuccess } = useToaster()
  const { closeDialog } = useDialog()
  const t = useTranslations("ProfilePage")

  async function handleLeaveCompany() {
    const response = await leaveCompany(company.action_id.toString())
    console.log(response)
    if (response.error) {
      toastError()
    } else {
      toastSuccess()
    }
  }

  const menuItems: MenuItem[] = [
    {
      icon: <ExitToAppIcon />,
      text: t("leaveCompany"),
      disabled: company.action === Action.OWNER,
      content: (
        <ContentDialog
          title={t("leaveCompany")}
          actions={
            <>
              <Button variant="contained" color="error" onClick={handleLeaveCompany}>
                {t("leaveCompany")}
              </Button>
              <Button variant="outlined" onClick={closeDialog}>
                {t("cancelText")}
              </Button>
            </>
          }
        >
          <p>{t("confirmLeaveCompany")}</p>
        </ContentDialog>
      ),
    },
  ]

  return (
    <CardHeader
      avatar={<Avatar src={company.company_avatar} alt={company.company_name} size="sm" />}
      title={
        <Link href={`/companies/${company.company_id}`} className={styles.link}>
          <h4>{company.company_name}</h4>
        </Link>
      }
      subheader={<span>{company.company_title}</span>}
      action={<SettingsMenu menuItems={menuItems} />}
    />
  )
}
