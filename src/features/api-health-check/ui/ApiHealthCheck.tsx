"use client"

import { Alert, Button, CircularProgress } from "@mui/material"
import { useHealthCheck } from "../hooks/useHealthCheck"

export const ApiHealthCheck = () => {
	const { isLoading, error, isHealthy, checkHealth } = useHealthCheck()

	return (
		<div>
			<Button variant="contained" onClick={checkHealth} disabled={isLoading}>
				{isLoading ? <CircularProgress size={24} /> : "Check API Health"}
			</Button>

			{isHealthy && <Alert severity="success">API is healthy!</Alert>}
			{error && <Alert severity="error">Error: {error}</Alert>}
		</div>
	)
}
