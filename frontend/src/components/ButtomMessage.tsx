import { Link } from "react-router-dom";

interface Myprops {
    label: string;
    to: string;
    linktext?: string;
}

export default function ButtomMessage({ label, to, linktext }: Myprops) {
    return <div  className="flex text-sm justify-center gap-1">
        <div className="text-neutral-600 text-sm dark:text-neutral-300">
            {label}
        </div>
        <Link className="text-blue-600 font-medium" to={to}>{linktext}</Link>
    </div>
}