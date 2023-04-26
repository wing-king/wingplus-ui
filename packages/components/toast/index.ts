import { withInstall } from "../utils";
import _Toast from "./toast";

export const Toast = withInstall(_Toast);
export default Toast;
export { showToast } from "./function-call";
export type { ToastType, ToastOptions, ToastPosition, ToastWordBreak } from "./types";
