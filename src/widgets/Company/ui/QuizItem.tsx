"use client"

import { UpdateQuizInfo, useDeleteQuizMutation } from "@entities/quiz"
import { CompanyDataQuiz } from "@features/company-data"
import {
  DeleteForever as DeleteIcon,
  EditNote as EditIcon,
  FactCheckOutlined as TakeQuizIcon,
} from "@mui/icons-material"
import { Button } from "@mui/material"
import MuiListItem from "@mui/material/ListItem"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import ListItemText from "@mui/material/ListItemText"
import { ConfirmActionModal } from "@shared/components/ConfirmActionModal"
import { type MenuItem, SettingsMenu } from "@shared/components/SettingsMenu"
import { Avatar } from "@shared/components/ui"
import { Routes } from "@shared/constants"
import { Link } from "@shared/i18n/navigation"
import { useTranslations } from "next-intl"
import { Permission } from "../lib/model/Permission"
import styles from "./Styles.module.scss"

export function QuizItem({ permission, quiz }: { permission: Permission; quiz: CompanyDataQuiz }) {
  const showSettingsMenu = permission.isAdmin || permission.isOwner
  const [deleteQuiz] = useDeleteQuizMutation()

  const t = useTranslations("CompanyPage.quizzes")

  const menuItems: MenuItem[] = [
    {
      icon: <EditIcon />,
      text: t("edit"),
      content: <UpdateQuizInfo quizId={quiz.quiz_id} />,
    },
    {
      icon: <DeleteIcon />,
      text: t("delete"),
      content: (
        <ConfirmActionModal
          title={t("modalDeleteQuizTitle")}
          message={t("confirmDeleteQuiz")}
          confirmAction={{
            onAction: () => deleteQuiz(quiz.quiz_id).unwrap(),
            buttonProps: {
              children: t("submitDeleteQuiz"),
              color: "error",
            },
            successMessage: t("successDeleteQuiz"),
            errorMessage: t("errorDeleteQuiz"),
          }}
          cancelAction={{
            buttonProps: {
              children: t("cancelDeleteQuiz"),
              color: "primary",
            },
          }}
        />
      ),
    },
  ]

  return (
    <MuiListItem
      secondaryAction={
        <div className={styles.quizzes__secondaryAction}>
          <Link href={`${Routes.QUIZZES}/${quiz.quiz_id}`} className={styles.link}>
            <Button
              variant="outlined"
              color="inherit"
              size="small"
              startIcon={<TakeQuizIcon sx={{ transform: "translateY(-1px) scale(1.2)" }} />}
            >
              {t("takeQuiz")}
            </Button>
          </Link>
          {showSettingsMenu && <SettingsMenu menuItems={menuItems} />}
        </div>
      }
    >
      <ListItemAvatar>
        <Avatar src={undefined} alt={quiz.quiz_name} size="sm" />
      </ListItemAvatar>

      <ListItemText primary={quiz.quiz_name} secondary={quiz.quiz_title} />
    </MuiListItem>
  )
}
