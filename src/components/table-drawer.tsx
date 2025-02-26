import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

import appDetailsMock from "../mocks/app_details.mock.json"
import {columns, InventoryAppDetailsType, User} from "@/components/main-table";

import {UserTable} from "@/components/user-table";

interface TableDrawerProps {
    open: boolean
    data: {
        // todo import type
        name: string
    }
}

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
            <Drawer onClose={onClose} defaultOpen>
                <DrawerTrigger>Open</DrawerTrigger>
                <DrawerContent>
                    <DrawerTitle>
                        App overview

                    </DrawerTitle>
                    <button onClick={onClose}>Cancel</button>


                    <div><img src={logo} alt={"logo"}/> <p>{name}</p></div>

                    <section>
                        <p>App Name: {name}</p>
                        <p>Category: {category}</p>
                        <p>Category: {users.length}</p>
                        <p>Category: <img src={connector.logo} alt={"connector logo"}/></p>
                        <p>Last classification: {lastClassification}</p>


                    </section>

                        <UserTable data={users}/>

                </DrawerContent>
            </Drawer>
        </section>
    );
};


