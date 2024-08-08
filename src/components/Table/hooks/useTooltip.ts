import { Tooltip } from "bootstrap";
import { useEffect } from "react";

import { TableColumn } from "../../../types/Table";

const useTooltip = (isTooltips: boolean, columns: TableColumn[]) => {
    useEffect(() => {
        if (!isTooltips) return;

        const tooltipTriggerList = document.querySelectorAll(
            '[data-bs-toggle="tooltip"]'
        );

        const tooltipList = [...tooltipTriggerList].map(
            (tooltipTriggerEl) => new Tooltip(tooltipTriggerEl)
        );

        return () => {
            tooltipList.forEach((element) => {
                element.hide();
            });
        };
    }, [isTooltips, columns]);
};

export default useTooltip;
