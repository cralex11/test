import Image from "next/image";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


import profileImg from "../assets/person.svg"
import logo from "../assets/logo.svg"
import helpSvg from "../assets/help.svg"
import arrowDownSvg from "../assets/arrow-down.svg"
import {ReactNode} from "react";
import * as React from "react";
import {cn} from "@/lib/utils";

const LiWithLink = ({children, className, isActive}: {
    children: ReactNode,
    isActive?: boolean
} & Pick<React.HTMLAttributes<HTMLDivElement>, "className">) => <li
    className={cn(className, "cursor-pointer px-6 flex items-center", {
        "border-b-[5px] border-white": isActive
    })}>{children}</li>


export const MainNavigation = () => {

    return (
        <nav className={"bg-[#1F5CED] text-sm border-b border-[#D3D5D7]"}>
            <section className="max-w-[1319px] px-6 mx-auto flex items-center text-white  h-[52px]">

                <Image src={logo} width={81} className="" alt="logo"/>

                <ul className={"flex mr-auto h-full font-medium "}>
                    <LiWithLink>Apps</LiWithLink>
                    <LiWithLink>Data</LiWithLink>
                    <LiWithLink>Identities</LiWithLink>
                    <LiWithLink>Alerts</LiWithLink>
                    <LiWithLink isActive>Investigation Center</LiWithLink>
                    <LiWithLink>Configurations</LiWithLink>
                </ul>

                <div className={"flex items-center gap-4"}>

                    <DropdownMenu>
                        <DropdownMenuTrigger className={"flex gap-2"}>
                            <Image src={profileImg} width={20} className="rounded-full size-6" alt="profile image"/>
                            <p className={"font-semibold"}>Security-Demo 2</p>
                            <Image src={arrowDownSvg} alt={'arrowDownSvg'}/>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Billing</DropdownMenuItem>
                            <DropdownMenuItem>Team</DropdownMenuItem>
                            <DropdownMenuItem>Subscription</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>


                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger><Image src={helpSvg} alt={'help icon'}/></TooltipTrigger>
                            <TooltipContent>
                                <p>Please contact Reco team for help</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                </div>

            </section>
        </nav>

    )
        ;
};
