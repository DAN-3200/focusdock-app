import { motion } from "framer-motion";

interface Item<T extends string> {
  key: T;
  label: string;
}

interface Props<T extends string> {
  items: Item<T>[];
  active: T;
  onChange: (key: T) => void;
}

export const SegmentedTabs = <T extends string>({ items, active, onChange }: Props<T>) => (
  <div className="flex gap-1 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-transparent p-0.5 rounded-xs">
    {items.map((item) => {
      const isActive = active === item.key;
      return (
        <motion.button
          key={item.key}
          type="button"
          aria-current={isActive ? "page" : undefined}
          onClick={() => onChange(item.key)}
          whileTap={{ scale: 0.96 }}
          className={`relative flex-1 px-2 py-1 text-[14px] font-medium transition-colors focus:outline-none ${
            isActive
              ? "text-white dark:text-zinc-900"
              : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100"
          }`}
        >
          {isActive && (
            <motion.span
              layoutId="segmented-active"
              className="absolute inset-0 bg-zinc-900 dark:bg-zinc-100 rounded-xs"
              transition={{ type: "spring", stiffness: 400, damping: 32 }}
            />
          )}
          <span className="relative z-10">{item.label}</span>
        </motion.button>
      );
    })}
  </div>
);
