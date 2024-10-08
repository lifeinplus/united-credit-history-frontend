export interface PanelHeaderProps {
    date?: PanelHeaderFieldProps;
    iconName: string;
    isExtendControl?: boolean;
    isSearch?: boolean;
    nameSpaces: string[];
    number?: PanelHeaderFieldProps;
}

export interface PanelHeaderFieldProps {
    caption: string | undefined;
    value: string | undefined;
}
