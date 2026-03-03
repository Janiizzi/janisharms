import { useRef } from 'react';
import NavMenu from './NavMenu.tsx';
import { Link } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Header = () => {
    const lottieRef = useRef<any>(null);

    return (
        <div className="grid grid-cols-[1fr_auto_1fr] items-center mx-10 my-4">
            <div /> {/* linker Spacer oder später Folder */}
            <Link
                to="/"
                className="justify-self-center"
                onMouseEnter={() => {
                    lottieRef.current?.setMode('forward');
                    lottieRef.current?.play();
                }}
                onMouseLeave={() => {
                    lottieRef.current?.setMode('reverse');
                    lottieRef.current?.play();
                }}
            >
                <DotLottieReact
                    src="/logo_janis_long_white.lottie"
                    renderConfig={{
                        autoResize: true,
                        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
                    }}
                    className="w-60 aspect-auto"
                    dotLottieRefCallback={(dotLottie) => {
                        lottieRef.current = dotLottie;
                    }}
                />
            </Link>
            <div className="justify-self-end">
                <NavMenu />
            </div>
        </div>
    )
}

export default Header