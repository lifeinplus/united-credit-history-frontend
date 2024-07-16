import { FC } from "react";
import { useTranslation } from "react-i18next";

import { Table } from "../../components";
import { PersonsProps } from "../../types/PersonalData";

import { tableColumns } from "./utils";

const Persons: FC<PersonsProps> = ({ persons }) => {
    const { t } = useTranslation(["personal_data"]);

    const columns = tableColumns.map((item) => ({
        ...item,
        name: t(`document.${item.sysName}`),
    }));

    return (
        <Table
            id={"pd"}
            columns={columns}
            data={persons}
            mobileView={true}
            textDifference={true}
        />
    );
};

export default Persons;
