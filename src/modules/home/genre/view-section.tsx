import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

type ViewSectionProps = {
  view: "grid" | "list";
  onViewChange: (view: ViewSectionProps["view"]) => void;
};

export const ViewSection = ({ view, onViewChange }: ViewSectionProps) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="flex flex-col-reverse sm:flex-row gap-4 mb-8 items-center justify-between w-full"
    >
      <div className="flex gap-2 w-full sm:w-auto justify-between sm:justify-start ml-auto">
        <div className="flex border rounded-md overflow-hidden">
          <Button
            variant={view === "grid" ? "default" : "ghost"}
            size="sm"
            className="rounded-none px-3"
            onClick={() => onViewChange("grid")}
          >
            <Icon icon="grid" className="h-4 w-4" />
          </Button>
          <Button
            variant={view === "list" ? "default" : "ghost"}
            size="sm"
            className="rounded-none px-3"
            onClick={() => onViewChange("list")}
          >
            <Icon icon="list" className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
