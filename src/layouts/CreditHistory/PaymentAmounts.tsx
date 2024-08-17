import classNames from "classnames";
import { useTranslation } from "react-i18next";

import { useAppSelector } from "../../app/hooks";
import { selectShowExtendedData } from "../../features/extendedData/extendedDataSlice";
import { selectTheme } from "../../features/theme/themeSlice";
import {
    AmountContextField,
    GroupProps,
    PaymentAmountsProps,
} from "../../types/CreditHistory";
import { langs } from "../../utils";

import { obligationFields, paymentFields } from "./utils";

const PaymentAmounts = ({ data }: PaymentAmountsProps) => {
    const { i18n, t } = useTranslation(["credit_history"]);
    const resolvedLanguage = i18n.resolvedLanguage ?? "en";
    const lang = langs[resolvedLanguage];
    const numberFormat = new Intl.NumberFormat(lang.locale);

    const showExtendedData = useAppSelector(selectShowExtendedData);

    const obligationLangSysNames = obligationFields.reduce((result, item) => {
        return item.country === lang.countryCode
            ? { ...result, [item.type]: item.sysName }
            : result;
    });

    const paymentLangSysNames = paymentFields.reduce((result, item) => {
        return item.country === lang.countryCode
            ? { ...result, [item.type]: item.sysName }
            : result;
    });

    const obligations = getAmounts(obligationFields);
    const payments = getAmounts(paymentFields);

    return (
        <div className="row justify-content-between text-center">
            <div className={showExtendedData ? "col-lg-4" : "col-lg-5"}>
                <Group amounts={obligations} justify="start" />
            </div>
            <div className={showExtendedData ? "col-lg-8" : "col-lg-7"}>
                <Group amounts={payments} justify="end" />
            </div>
        </div>
    );

    function getAmounts(fields: AmountContextField[]) {
        return fields
            .filter(
                ({ extended, sysName, hide }) =>
                    !hide &&
                    sysName !== paymentLangSysNames.chb &&
                    sysName !== paymentLangSysNames.flc &&
                    (!extended || (extended && showExtendedData))
            )
            .map((item) => {
                const { sysName, type } = item;

                const obligationKey =
                    type as keyof typeof obligationLangSysNames;
                const paymentKey = type as keyof typeof paymentLangSysNames;

                const langSysName =
                    obligationLangSysNames[obligationKey] ||
                    paymentLangSysNames[paymentKey];

                const langKey = langSysName as keyof typeof data;
                const value = data && (data[sysName] ?? data[langKey]);

                return {
                    ...item,
                    name: t(`amounts.${sysName}`),
                    value: numberFormat.format(Number(value) || 0),
                };
            });
    }

    function Group({ amounts, justify }: GroupProps) {
        const theme = useAppSelector(selectTheme);

        return (
            <ul
                className={classNames(
                    `list-group`,
                    `list-group-horizontal`,
                    `justify-content-sm-center`,
                    `justify-content-lg-${justify}`,
                    `mb-3`
                )}
            >
                {amounts.map(({ context, name, sysName, value }) => {
                    const contextClass = `list-group-item-${context}`;
                    const darkContextClass =
                        theme === "dark" && `uch-list-group-item-${context}`;

                    return (
                        <li
                            key={sysName}
                            className={classNames(
                                "list-group-item",
                                "uch-list-group-item",
                                context && (darkContextClass || contextClass),
                                theme,
                                "text-truncate"
                            )}
                        >
                            {name}
                            <div className="fw-bold">{value}</div>
                        </li>
                    );
                })}
            </ul>
        );
    }
};

export default PaymentAmounts;
