import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { buttonVariants } from "./button-variant";
import { cn } from "./utils";


const Button = React.forwardRef((props, ref) => {
    const {
        className,
        variant,
        size,
        asChild = false,
        ...rest
    } = props;

    const Comp = asChild ? Slot : "button";

    return (
        <Comp
            ref={ref}
            data-slot="button"
            className={cn(buttonVariants({ variant, size, className }))}
            {...rest}
        />
    );
});

Button.displayName = "Button";

export { Button };
