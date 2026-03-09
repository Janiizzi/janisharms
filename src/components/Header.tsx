import { lazy, Suspense } from 'react';
import NavMenu from './NavMenu.tsx';

const LogoLottie = lazy(() => import('./LogoLottie'));

const Header = () => {
    return (
        <div className="grid grid-cols-[1fr_auto_1fr] items-center mx-10 my-4">
            <div /> {/* linker Spacer oder später Folder */}
            <Suspense fallback={<div className="w-60 h-10" />}>
                <LogoLottie />
            </Suspense>
            <div className="justify-self-end">
                <NavMenu />
            </div>
        </div>
    )
}

export default Header