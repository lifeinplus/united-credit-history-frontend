import { useTranslation } from "react-i18next";
import { Table } from "../../components";
import type { PersonsProps } from "../../types";
import { personsColumns } from "../../utils";

const Persons = ({ persons }: PersonsProps) => {
    const { t } = useTranslation(["personal_data"]);

    const columns = personsColumns.map((item) => ({
        ...item,
        name: t(`document.${item.sysName}`),
    }));

    return (
        <Table
            id="persons"
            columns={columns}
            data={persons}
            isMobileView={true}
            isTextDifference={true}
        />
    );
};

export default Persons;
