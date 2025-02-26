import {DataTableDemo} from "@/components/main-table";



export default function Home() {
    return (
        <div className="">

            <nav className={"flex h-[52px] bg-[#1F5CED] text-white items-center"}>

                <div>RECO</div>
                <ul className={"flex mr-auto"}>
                    <li className={"border border-b-4 border-white"}>Apps</li>
                    <li>Data</li>
                    <li>Identities</li>
                    <li>Alerts</li>
                    <li>Investigation Center</li>
                    <li>Configurations</li>
                </ul>
                <div className={"flex"}>
                    <div>logo</div>
                    <p>Security-Demo 2</p>
                    <div>tooltip</div>
                </div>
            </nav>

            <h2>App Inventory</h2>

            <DataTableDemo/>

        </div>
    );
}
