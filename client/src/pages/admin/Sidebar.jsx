import React from 'react'
import { Link } from 'react-router-dom';
import { FaUserAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { TbCategoryPlus } from "react-icons/tb";
import { AiFillProduct } from "react-icons/ai";
import { PiFlagBannerFoldFill } from "react-icons/pi";
import { FaJediOrder } from "react-icons/fa";

const Sidebar = () => {

    const menuItems = [
        {
            title: "MENU",
            items: [
                {
                    label: "Dashboard",
                    href: "/admin",
                    icon: <MdDashboard />
                },
                {
                    label: "Categories",
                    href: "/admin/categories",
                    icon: <TbCategoryPlus />
                },
                {
                    label: "Recipe",
                    href: "/admin/recipe",
                    icon: <AiFillProduct />
                },
                {
                    label: "Banner",
                    href: "/admin/banner",
                    icon: <PiFlagBannerFoldFill />
                },
                {
                    label: "Users",
                    href: "/admin/users",
                    icon: <FaUserAlt />
                },
                {
                    label: "Orders",
                    href: "/admin/order",
                    icon: <FaJediOrder />
                },
            ],
        },
    ];

    return (
        <div className="mt-4 text-sm">
            {menuItems.map((i) => (
                <div className="flex flex-col gap-2" key={i.title}>
                    <span className="hidden lg:block text-gray-400 font-light my-4">
                        {i.title}
                    </span>
                    {i.items.map((item) => (
                        <Link
                            to={item.href} // Corrected prop to "to"
                            key={item.label}
                            className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-gray-200"
                        >
                            {item.icon}
                            <span className="hidden lg:block">{item.label}</span>
                        </Link>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Sidebar