import {
  Check,
  Circle,
  Disc,
  Eye,
  EyeOff,
  Grid3X3,
  Heart,
  List,
  LoaderCircle,
  LogOut,
  Mic,
  MoreHorizontal,
  Music,
  Play,
  Plus,
  type LucideProps,
} from "lucide-react";

const iconCollection = {
  eyeOff: EyeOff,
  eye: Eye,
  music: Music,
  disc: Disc,
  mic: Mic,
  grid: Grid3X3,
  logOut: LogOut,
  plus: Plus,
  circle: Circle,
  loader: LoaderCircle,
  horizontal: MoreHorizontal,
  check: Check,
  play: Play,
  list: List,
  heart: Heart,
};

export type IconProps = LucideProps & {
  icon: keyof typeof iconCollection;
};

export const Icon = ({ icon, ...props }: IconProps) => {
  const Icon = iconCollection[icon];

  if (!Icon) throw new Error("Icon not found");

  return <Icon {...props} />;
};
