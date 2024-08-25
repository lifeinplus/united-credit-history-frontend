import { useTranslation } from "react-i18next";
import { Table } from "../../components";
import type { PersonsProps } from "../../types/PersonalData";
import { tableColumns } from "./utils";

const Persons = ({ persons }: PersonsProps) => {
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
            isMobileView={true}
            isTextDifference={true}
        />
    );
};

export default Persons;
