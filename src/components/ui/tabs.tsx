import * as React from "react";
import { cn } from "@/lib/cn";

type TabsContext = { value: string; setValue: (v: string) => void };
const Ctx = React.createContext<TabsContext | null>(null);

export function Tabs({
  defaultValue,
  value: controlledValue,
  onValueChange,
  className,
  children,
}: {
  defaultValue?: string;
  value?: string;
  onValueChange?: (v: string) => void;
  className?: string;
  children: React.ReactNode;
}) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue || "");
  
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;
  
  const setValue = React.useCallback((v: string) => {
    if (!isControlled) {
      setUncontrolledValue(v);
    }
    onValueChange?.(v);
  }, [isControlled, onValueChange]);

  return (
    <div className={className}>
      <Ctx.Provider value={{ value, setValue }}>{children}</Ctx.Provider>
    </div>
  );
}

export function TabsList({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("inline-flex gap-3 bg-transparent", className)} {...props} />
  );
}

export function TabsTrigger({
  value,
  className,
  children,
}: {
  value: string;
  className?: string;
  children: React.ReactNode;
}) {
  const ctx = React.useContext(Ctx)!;
  const active = ctx.value === value;

  return (
    <button
      type="button"
      onClick={() => ctx.setValue(value)}
      className={cn(
        "px-5 py-2 text-[16px] font-medium rounded-lg transition-all duration-200 shadow-none",
        active
          ? "bg-[#F3F3F3] text-[#FF7020] shadow-inner"
          : "text-[#4F4640] hover:bg-gray-100 hover:text-[#FF7020]",
        className
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({
  value,
  className,
  children,
}: {
  value: string;
  className?: string;
  children: React.ReactNode;
}) {
  const ctx = React.useContext(Ctx)!;
  if (ctx.value !== value) return null;
  return <div className={className}>{children}</div>;
}
