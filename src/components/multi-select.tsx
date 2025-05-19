import { useEffect, useState } from "react";

import { ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Icon } from "./icon";
import { useDisclosure } from "@/hooks/use-disclosure";

type Option = {
  value: number;
  label: string;
};

type BaseSelectProps = {
  placeholder: string;
  command: {
    placeholder: string;
    emptyMessage: string;
  };
  multi: boolean;
  options: Option[];
};

type MultiSelectProps = BaseSelectProps & {
  multi: true;
  selected?: Option[];
  onSelect: (selected: Option[]) => void;
};

type SingleSelectProps = BaseSelectProps & {
  multi: false;
  selected?: Option;
  onSelect: (selected: Option) => void;
};

type SelectProps = MultiSelectProps | SingleSelectProps;

export const MultiSelect = ({
  command,
  multi,
  onSelect,
  options,
  selected: selectedValue,
  placeholder,
}: SelectProps) => {
  const { isOpen, onClose, onToggle } = useDisclosure();
  const [selected, setSelected] = useState<Option[]>([]);

  useEffect(() => {
    if (!selectedValue) return setSelected([]);
    if (multi) {
      setSelected(selectedValue);
    } else {
      setSelected([selectedValue]);
    }
  }, [selectedValue]);

  return (
    <Popover open={isOpen} onOpenChange={onToggle} modal>
      <PopoverTrigger asChild>
        {/** @ts-expect-error aria-attribute error */}
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          <LabelValue
            placeholder={placeholder}
            value={
              !multi
                ? selected[0]?.label
                : selected.length > 3
                  ? `${selected.length} options selected`
                  : selected.length === 0
                    ? placeholder
                    : selected.map((s) => s.label).join(",")
            }
          />

          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-[300px] p-0">
        <Command>
          <CommandInput placeholder={command.placeholder} className="h-9" />
          <CommandList>
            <CommandEmpty>{command.emptyMessage}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selected.some(
                  (s) => s.value === option.value
                );
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (multi) {
                        setSelected((prev) => {
                          let newSelected;
                          if (isSelected) {
                            newSelected = prev.filter(
                              (v) => v.value !== option.value
                            );
                          } else {
                            newSelected = [...prev, option];
                          }

                          onSelect(newSelected);
                          return newSelected;
                        });
                      } else {
                        const newSelected = [option];
                        setSelected(newSelected);
                        onSelect(option);
                        onClose();
                      }
                    }}
                  >
                    {option.label}
                    {isSelected && <Icon icon="check" className="ml-auto" />}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const LabelValue = ({
  placeholder,
  value,
}: {
  placeholder: string;
  value: string;
}) => {
  return <p className="text-sm">{value || placeholder}</p>;
};
