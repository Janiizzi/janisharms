import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const LogoLottie = () => {
    const lottieRef = useRef<any>(null);

    return (
        <Link
            to="/"
            className="justify-self-center"
            aria-label="Janis Harms – Zur Startseite"
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
    );
};

export default LogoLottie;
