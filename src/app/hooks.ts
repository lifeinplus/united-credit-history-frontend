import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootStte } from "./store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootStte>();
