'use client';

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import React, {useState} from "react";
// "appId": "0",
//     "name": "Zoom",
//     "category": "Video Conferencing",
//     "connector": "Reco",
//     "logos": {
//       "app": "https://w7.pngwing.com/pngs/1023/88/png-transparent-zoom-social-media-meeting-logo-apps-social-media-icon-thumbnail.png",
//       "connector": "https://cdn.prod.website-files.com/644fc991ce69ff0d3bdbeb63/654b815aaae657a2646a635e_logo_reco.svg"

import appsInventoryMock from "../mocks/apss_inventory.mock.json"
import {TableDrawer} from "@/components/table-drawer";
import Image from "next/image";

import arrowsSvg from "../assets/arrows.svg"
import {ImageWithPlaceholder} from "@/components/image-with-placeholder";

export interface User {
    id: string
    name: string
    pic?: string
}

interface Logos {
    app?: string
    connector: string
}

export interface InventoryAppType {
    appId: string
    name: string
    category: string
    connector: string
    logos: Logos
}

export interface InventoryAppDetailsType extends Omit<InventoryAppType, "logos" | "connector"> {
    lastClassification: string
    logo: string
    connector: {
        name: string
        logo: string
    }
    users: User[]

}


const data: InventoryAppType[] = appsInventoryMock;


const HeaderWithSort = ({onClick, title}: {
    onClick: () => void,
    title: string
}) => (<button
    className={"flex gap-2.5 text-[#222425]"}
    onClick={onClick}
>{title} <Image src={arrowsSvg} alt={"arrows"}/></button>)
export const columns: ColumnDef<InventoryAppType>[] = [
    {
        accessorKey: "logos",
        id: "app",
        header: ({column}) => <HeaderWithSort
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} title={"Name"}/>,

        cell: ({cell}) => {
            const src = cell.getValue<Logos>().app;

            return (<ImageWithPlaceholder key={cell.id} src={src} className={"size-[40px] bg-white rounded-full border border-[#E8E9FF]"}/>)
        }
    },
    {
        accessorKey: "category",
        header: ({column}) => <HeaderWithSort
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} title={"Category"}/>,
    },
    {
        accessorKey: "logos",
        id: "connector",
        header: ({column}) => <HeaderWithSort
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} title={"Connector"}/>,
        cell: ({cell}) => {
            const src = cell.getValue<Logos>().connector;

            if (!src) return <div>placeholder</div>

            return (<img key={cell.id} width={40} height={40} src={src} alt={"app logo"}/>)
        }
    },
]

export function DataTableDemo() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
        },
    })


    const [selectedAppId, setSelectedAppId] = useState<string | null>(null);

    const onClose = () => setSelectedAppId(null)

    return (
        <div className="w-full">
            <TableDrawer onClose={onClose} selectedAppId={selectedAppId}/>

            <div className="mt-7">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className={"cursor-pointer"}
                                    onClick={() => setSelectedAppId(row.original.appId)}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">

                <div className="space-x-2">
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}
