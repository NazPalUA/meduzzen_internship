import { Container, ContainerProps } from "@mui/material"

export function PageContainer(props: ContainerProps) {
	return (
		<Container
			maxWidth="sm"
			sx={{
				textAlign: "center",
				paddingTop: "50px",
			}}
			{...props}
		/>
	)
}
