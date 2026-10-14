import { cn } from "@/lib/utils";

export const Container = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("site-container", className)}>
            {children}
        </div>
    );
};
