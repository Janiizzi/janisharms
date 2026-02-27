import React from 'react'
import logoJanis from '../assets/logo_janis_white.svg';
import NavMenu from './NavMenu.tsx';
import { Link } from 'react-router-dom';
import Folder from './Folder.tsx'

const Header = () => {
    return (
        <div className="grid grid-cols-[1fr_auto_1fr] items-center mx-10 my-4">
            <div /> {/* linker Spacer oder später Folder */}
            <Link to="/" className="justify-self-center">
                <img className="w-25 h-25" src={logoJanis} alt="logo" />
            </Link>
            <div className="justify-self-end">
                <NavMenu />
            </div>
        </div>
    )
}

export default Header