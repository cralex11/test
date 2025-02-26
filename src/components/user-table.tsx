import {User} from "@/components/main-table";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
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
import React from "react";

import {ImageWithPlaceholder} from "@/components/image-with-placeholder";

interface UserTableProps {
    data: User[]
}


export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "name",
        header: () => <p className={"text-[#222425]"}>Username</p>,
        cell: ({cell}) => {
            const user = cell.row.original;
            const src = user?.pic;

            return (
                <div className={"flex gap-2.5 "} key={cell.id}>
                    <ImageWithPlaceholder src={src}
                                          className={"w-[20px] bg-white rounded-full border border-[#E8E9FF] h-[20px]"}/>
                    <p>{user.name}</p>
                </div>)
        }
    }]

export const UserTable = ({data}: UserTableProps) => {
    const table = useReactTable<User>({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })


    return (
        <section className={"mt-6 rounded-[8px] border border-[#E8E9FF]"}>
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
            </Table></section>
    )

}

