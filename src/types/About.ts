export interface LegendProps {
    legend: Array<{
        id: string;
        leftBadge: string;
        leftText: string;
        rightBadge: string;
        rightText: string;
    }>;
    textTheme: string;
}

export interface TaskProps {
    tasks: Array<{
        id: string;
        title: string;
        text: string;
    }>;
    textTheme: string;
}

export interface TitleProps {
    name: string;
    textTheme: string;
}
