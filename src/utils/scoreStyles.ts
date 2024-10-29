interface ScoreStyle {
    min: number;
    max: number;
    style: string;
}

export const scoreStyles: ScoreStyle[] = [
    { min: 300, max: 499, style: "text-bg-danger" },
    { min: 500, max: 649, style: "text-bg-warning" },
    { min: 650, max: 799, style: "text-bg-info" },
    { min: 800, max: 850, style: "text-bg-success" },
];
