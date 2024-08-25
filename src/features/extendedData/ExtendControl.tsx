import { memo } from "react";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "../../app/hooks";

import {
    selectShowExtendedData,
    toggleExtendedData,
} from "./extendedDataSlice";

const ExtendControl = () => {
    const { t } = useTranslation(["credit_history"]);
    const dispatch = useAppDispatch();
    const showExtendedData = useAppSelector(selectShowExtendedData);

    return (
        <div>
            <div className="form-check form-switch navbar-text pb-1">
                <input
                    id="switchExtendedData"
                    checked={showExtendedData}
                    className="form-check-input"
                    onChange={() => dispatch(toggleExtendedData())}
                    role="switch"
                    type="checkbox"
                />
                <label
                    className="form-check-label"
                    htmlFor="switchExtendedData"
                >
                    {t("extended_control")}
                </label>
            </div>
        </div>
    );
};

export default memo(ExtendControl);
