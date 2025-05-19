import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Link, useLocation, useRouter } from "@tanstack/react-router";
import { navItems } from "./dashboard-navitems";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useSuspenseQuery } from "@tanstack/react-query";
import { userQueryOptions } from "@/services";
import { generateRandomImage } from "@/lib/generate-random-image";

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = useLocation({
    select: (location) => location.pathname,
  });
  const router = useRouter();
  const [accessToken, set, remove] = useLocalStorage("accessToken");
  const [refreshToken, setRT, removeRt] = useLocalStorage("refreshToken");
  const { data } = useSuspenseQuery(userQueryOptions);

  const onLogout = () => {
    remove();
    removeRt();
    router.navigate({ to: "/login", reloadDocument: true, replace: true });
  };

  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen w-screen">
        <Sidebar collapsible="icon">
          <SidebarHeader>
            <Link to="/dashboard" className="flex items-center gap-2 px-4 py-2">
              <Icon icon="music" className="h-6 w-6 text-primary" />
            </Link>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.link}
                        tooltip={item.title}
                      >
                        <Link to={item.link}>
                          {item.icon}
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <SidebarMenuButton className="cursor-pointer">
                            <Avatar className="h-6 w-6">
                              <AvatarImage
                                src={generateRandomImage()}
                                alt={data.data.user?.email}
                              />
                              <AvatarFallback>
                                {data.data.user?.email}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col items-start">
                              <span className="text-xs text-muted-foreground">
                                {data.data.user?.email}
                              </span>
                            </div>
                          </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                          <div className="flex items-center justify-start gap-2 p-2">
                            <div className="flex flex-col space-y-1 leading-none">
                              <p className="text-xs text-muted-foreground">
                                {data.data.user?.email}
                              </p>
                            </div>
                          </div>
                          <DropdownMenuSeparator />

                          <DropdownMenuItem
                            onClick={onLogout}
                            className="text-red-500"
                          >
                            <Icon icon="logOut" className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TooltipTrigger>
                    <TooltipContent side="right">Profile</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
            <SidebarTrigger />
            <div className="flex-1" />
            <nav className="flex items-center gap-4">
              <Button variant="outline" size="sm" asChild>
                <Link to="/">
                  <Icon icon="music" className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
            </nav>
          </header>
          <main className="flex-1 p-4 sm:p-6 md:p-8">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};
