"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useDevice } from "@/hooks/use-device";
import * as React from "react";

interface ResponsiveDialogProps extends React.PropsWithChildren {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

function ResponsiveDialog({
  children,
  trigger,
  open,
  onOpenChange,
  className,
}: ResponsiveDialogProps) {
  const { isMobile } = useDevice();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}
        <DrawerContent className={className}>{children}</DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className={className}>{children}</DialogContent>
    </Dialog>
  );
}

// Unified components that work with both Dialog and Drawer
function ResponsiveDialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { isMobile } = useDevice();
  const Component = isMobile ? DrawerHeader : DialogHeader;
  return <Component className={className} {...props} />;
}

function ResponsiveDialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { isMobile } = useDevice();
  const Component = isMobile ? DrawerFooter : DialogFooter;
  return <Component className={className} {...props} />;
}

function ResponsiveDialogTitle({
  className,
  ...props
}: React.ComponentProps<"h2">) {
  const { isMobile } = useDevice();
  const Component = isMobile ? DrawerTitle : DialogTitle;
  return <Component className={className} {...props} />;
}

function ResponsiveDialogDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  const { isMobile } = useDevice();
  const Component = isMobile ? DrawerDescription : DialogDescription;
  return <Component className={className} {...props} />;
}

function ResponsiveDialogClose(props: React.ComponentProps<"button">) {
  const { isMobile } = useDevice();
  const Component = isMobile ? DrawerClose : DialogClose;
  return <Component {...props} />;
}

export {
  ResponsiveDialog,
  ResponsiveDialogClose,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
};
