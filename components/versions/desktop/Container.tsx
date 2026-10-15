import { cn } from "@/lib/utils";

export const Container = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("mx-auto px-[clamp(2rem,4vw,5rem)] w-full max-w-[var(--content-width)]", className)}>
            {children}
        </div>
    );
};
