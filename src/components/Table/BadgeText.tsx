interface BadgeTextProps {
    text: string;
}

const BadgeText = ({ text }: BadgeTextProps) => {
    return <mark className={"uch-badge diff uch-text-bg-A"}>{text}</mark>;
};

export default BadgeText;
