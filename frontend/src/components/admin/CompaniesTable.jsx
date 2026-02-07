import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { setCompanies } from "@/redux/companySlice";

const CompaniesTable = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useGetAllCompanies(); // fetch all companies on mount

    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filteredCompanies, setFilteredCompanies] = useState([]);

    // Filter companies based on search text
    useEffect(() => {
        setFilteredCompanies(
            companies.filter(c =>
                !searchCompanyByText
                    ? true
                    : c.name.toLowerCase().includes(searchCompanyByText.toLowerCase())
            )
        );
    }, [companies, searchCompanyByText]);

    // Delete company
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this company?")) return;

        try {
            const res = await axios.delete(`${COMPANY_API_END_POINT}/delete/${id}`, {
                withCredentials: true
            });

            if (res.data.success) {
                toast.success(res.data.message);

                // Remove deleted company from Redux state for instant UI update
                const updatedCompanies = companies.filter(c => c._id !== id);
                dispatch(setCompanies(updatedCompanies));
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div>
            <Table>
                <TableCaption>Recent registered companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredCompanies.map(company => (
                        <TableRow key={company._id}>
                            <TableCell>
                                <Avatar>
                                    <AvatarImage src={company.logo || "/default-logo.png"} alt={company.name} />
                                </Avatar>
                            </TableCell>
                            <TableCell>{company.name}</TableCell>
                            <TableCell>{company.createdAt?.split("T")[0]}</TableCell>
                            <TableCell className="text-right">
                                <Popover>
                                    <PopoverTrigger>
                                        <MoreHorizontal className="cursor-pointer" />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-32 flex flex-col gap-2">
                                        {/* Edit option */}
                                        <div
                                            onClick={() => navigate(`/admin/companies/${company._id}`)}
                                            className="flex items-center gap-2 cursor-pointer hover:text-blue-500 p-1 rounded"
                                        >
                                            <Edit2 className="w-4" />
                                            <span>Edit</span>
                                        </div>
                                        {/* Delete option */}
                                        <div
                                            onClick={() => handleDelete(company._id)}
                                            className="flex items-center gap-2 cursor-pointer text-red-600 hover:text-red-800 p-1 rounded"
                                        >
                                            <Trash2 className="w-4" />
                                            <span>Delete</span>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default CompaniesTable;
