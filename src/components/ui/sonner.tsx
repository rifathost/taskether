import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      position="bottom-center"
      offset="80px"
      duration={2000}
      toastOptions={{
        classNames: {
          toast:
            "group toast rounded-full bg-gradient-primary px-5 py-3 text-primary-foreground shadow-hero border-0",
          description: "group-[.toast]:text-primary-foreground/80",
          actionButton: "group-[.toast]:bg-primary-foreground group-[.toast]:text-primary",
          cancelButton: "group-[.toast]:bg-white/20 group-[.toast]:text-primary-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
