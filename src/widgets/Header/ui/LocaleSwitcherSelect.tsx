"use client"

import { usePathname, useRouter } from "@/src/shared/i18n/navigation"
import { Locale } from "@/src/shared/i18n/routing"
import { Select, SelectChangeEvent } from "@mui/material"
import clsx from "clsx"
import { useParams } from "next/navigation"
import { ReactNode, useTransition } from "react"
import styles from "./LocaleSwitcherSelect.module.scss"

type Props = {
	children: ReactNode
	defaultValue: string
	label: string
}

export function LocaleSwitcherSelect({ children, defaultValue, label }: Props) {
	const router = useRouter()
	const [isPending, startTransition] = useTransition()
	const pathname = usePathname()
	const params = useParams()

	function onSelectChange(event: SelectChangeEvent<string>) {
		const nextLocale = event.target.value as Locale
		startTransition(() => {
			router.replace(
				// @ts-expect-error -- TypeScript will validate that only known `params`
				// are used in combination with a given `pathname`. Since the two will
				// always match for the current route, we can skip runtime checks.
				{ pathname, params },
				{ locale: nextLocale }
			)
		})
	}

	return (
		<Select
			variant="standard"
			className={clsx(styles.select, isPending && styles.pending)}
			defaultValue={defaultValue}
			disabled={isPending}
			onChange={onSelectChange}
			label={label}
		>
			{children}
		</Select>
	)
}
