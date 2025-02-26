import {
    Drawer,
    DrawerContent,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

import appDetailsMock from "../mocks/app_details.mock.json"
import {InventoryAppDetailsType} from "@/components/main-table";

import {UserTable} from "@/components/user-table";
import Image from "next/image";

import closeSvg from "../assets/close.svg"

const appData = [appDetailsMock]

const getAppData = (appId: string): InventoryAppDetailsType | undefined => appData.find(app => app.appId === appId)

export const TableDrawer = ({selectedAppId, onClose}: {
    selectedAppId: string | null
    onClose: () => void
}) => {
    if (!selectedAppId) {
        return null
    }

    const data = getAppData(selectedAppId);
    if (!data) {
        return null
    }

    const {
        name, logo, lastClassification, users, connector,
        category
    } = data;

    return (
        <section>
            <Drawer direction={"right"} onClose={onClose} open={true}>
                <DrawerContent
                    className={"bottom-2 border-[#DCDCDC] px-[30px] py-[22px]  bg-[#FAFAFA] left-auto right-0 top-0 mt-0 w-[714px] overflow-hidden rounded-none overflow-y-scroll"}>
                    <DrawerTitle className={"flex justify-between"}>
                        App overview

                        <button onClick={onClose} className={""}>
                            <Image src={closeSvg} alt={"close"}/>
                        </button>
                    </DrawerTitle>


                    <div className={"flex gap-2.5 mt-2.5"}>
                        <img src={logo} alt={"logo"} className={"w-[22px] h-[22px]"}/>
                        <p className={"text-[#717171]"}>{name}</p>
                    </div>

                    <section
                        className={'mt-2.5 font-sm text-[#4C4C4C]  flex flex-col gap-4 border-[#3E74FF] border p-4 bg-[#3E74FF0D] rounded'}>
                        <p>App Name: {name}</p>
                        <p>Category: {category}</p>
                        <p>Category: {users.length}</p>
                        <p className={"flex gap-2.5"}>Category:
                            <div
                                className={"size-[20px] flex justify-center items-center bg-white rounded-full border border-[#E8E9FF] "}>
                                <img src={connector.logo} alt={"connector logo"}
                                     className={"p-0.5"}/>
                            </div>

                        </p>
                        <p>Last classification: {lastClassification}</p>
                    </section>

                    <UserTable data={[...users,...users]}/>

                </DrawerContent>
            </Drawer>
        </section>
    );
};


