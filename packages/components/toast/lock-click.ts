let lockCount = 0;

export function lockClick(lock: boolean) {
	if (lock) {
		if (!lockCount) {
			document.body.classList.add("wp-toast--unclickable");
		}

		lockCount++;
	} else if (lockCount) {
		lockCount--;

		if (!lockCount) {
			document.body.classList.remove("wp-toast--unclickable");
		}
	}
}
