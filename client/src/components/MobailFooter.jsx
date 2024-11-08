import React, { useContext } from 'react';
import { IoHomeOutline, IoSearchOutline } from 'react-icons/io5';
import { LuUserCircle2 } from 'react-icons/lu';
import { BsCartCheck } from 'react-icons/bs';
import { GiFoodTruck } from 'react-icons/gi';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const MobailFooter = () => {
    const { user,handleMenuClick } = useContext(AuthContext);

    const menu = [
        {
            icon: <IoHomeOutline />,
            name: 'Home',
            url: '/',
        },
        {
            icon: <GiFoodTruck />,
            name: 'Food',
            url: '/food',
        },
        {
            icon: <IoSearchOutline />,
            name: 'Search',
            url: '/search',
        },
        {
            icon: <LuUserCircle2 />,
            name: 'Account',
            url: user != null ? '/profile' : '/login',
        },
        {
            icon: <BsCartCheck />,
            name: 'Order',
            url: user != null ? '/order' : '/login',
        },
    ];

    return (
        <div className="w-full md:hidden h-[56px] border-t-[1px] flex">
            {menu.map((item, index) => (
                <Link to={item.url} onClick={handleMenuClick} key={index} className="w-[78px] flex justify-center items-center flex-col">
                    <div>{item.icon}</div>
                    <div>{item.name}</div>
                </Link>
            ))}
        </div>
    );
};

export default MobailFooter;
