import classNames from "classnames";
import { useTranslation } from "react-i18next";

import { PanelHeader } from "../components";
import { useTheme } from "../contexts";
import { LegendProps, TaskProps, TitleProps } from "../types/About";

const About = () => {
    const theme = useTheme();
    const { t } = useTranslation(["about"]);
    const textTheme = theme === "light" ? "text-dark" : "text-light";

    const tasks = ["t1", "t2", "t3", "t4", "t5", "t6", "t7"].map((task) => {
        return {
            id: task,
            text: t(`tasks.${task}.text`),
            title: t(`tasks.${task}.title`),
        };
    });

    const legend = [
        { leftBadge: "0", rightBadge: "1" },
        { leftBadge: "A", rightBadge: "B" },
        { leftBadge: "C", rightBadge: "D" },
        { leftBadge: "E", rightBadge: "F" },
        { leftBadge: "G", rightBadge: "-" },
    ].map((item) => {
        return {
            ...item,
            id: item.leftBadge + item.rightBadge,
            leftText: t(`legend.${item.leftBadge}`),
            rightText: t(`legend.${item.rightBadge}`),
        };
    });

    return (
        <section className="container-fluid mb-3">
            <div
                className={classNames(
                    `row panel ${theme} pt-3 pb-2 rounded-bottom`,
                    `border border-top-0`,
                    theme === "dark" && "uch-border-dark"
                )}
            >
                <div className="col">
                    <PanelHeader
                        iconName={"bi-file-text"}
                        nameSpaces={["about"]}
                    />
                    <article className="row">
                        <Title
                            name={t("definition.title")}
                            textTheme={textTheme}
                        />
                        <div className="col-12">
                            <p className={textTheme}>{t("definition.value")}</p>
                        </div>
                    </article>
                    <article className="row">
                        <Title name={t("tasks.title")} textTheme={textTheme} />
                        <div className="col-12">
                            <Tasks tasks={tasks} textTheme={textTheme} />
                        </div>
                    </article>
                    <article className="row">
                        <Title name={t("legend.title")} textTheme={textTheme} />
                        <div className="col-12">
                            <Legend legend={legend} textTheme={textTheme} />
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
};

function Title({ name, textTheme }: TitleProps) {
    return (
        <header className="col-12 my-2">
            <h5 className={textTheme}>{name}</h5>
        </header>
    );
}

function Tasks({ tasks, textTheme }: TaskProps) {
    return (
        <ol className={textTheme}>
            {tasks.map((task) => (
                <li key={task.id}>
                    <dl className="row">
                        <dd className="col-sm-9 col-lg-10">{task.text}</dd>
                        <dt className="col-sm-3 col-lg-2 text-truncate">
                            <i className="d-none d-sm-inline bi bi-caret-left-fill"></i>
                            <i className="d-sm-none bi bi-caret-up-fill"></i>{" "}
                            {task.title}
                        </dt>
                    </dl>
                </li>
            ))}
        </ol>
    );
}

function Legend({ legend, textTheme }: LegendProps) {
    return (
        <>
            {legend.map((item) => (
                <div key={item.id} className="row">
                    <div className="col-3 col-sm-2 col-lg-1 order-sm-2 text-center mb-2">
                        <span
                            className={`uch-badge status uch-text-bg-${item.leftBadge}`}
                        >
                            {item.leftBadge}
                        </span>
                    </div>
                    <div className="col-9 col-sm-4 col-lg-5 order-sm-1 text-sm-end mb-2">
                        <span className={textTheme}>{item.leftText}</span>
                    </div>
                    <div className="col-3 col-sm-2 col-lg-1 order-sm-3 text-center mb-2">
                        <span
                            className={`uch-badge status uch-text-bg-${item.rightBadge}`}
                        >
                            {item.rightBadge}
                        </span>
                    </div>
                    <div className="col-9 col-sm-4 col-lg-5 order-sm-4 mb-2">
                        <span className={textTheme}>{item.rightText}</span>
                    </div>
                </div>
            ))}
        </>
    );
}

export default About;
