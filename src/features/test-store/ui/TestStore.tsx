import { ResetButtons } from "./ResetButtons"
import { TestComponentAlpha } from "./TestComponentAlpha"
import { TestComponentBetta } from "./TestComponentBetta"
import style from "./TestStore.module.scss"

export const TestStore = () => {
	return (
		<div className={style.container}>
			<div className={style.components}>
				<TestComponentAlpha />
				<TestComponentBetta />
			</div>
			<ResetButtons />
		</div>
	)
}
