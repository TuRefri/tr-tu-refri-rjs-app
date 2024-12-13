//@ts-ignore
import QRScanner from '../components/qrScanner/QRScanner.jsx'
export default function Scan() {

return (
    <div className="w-full h-full flex flex-col overflow-y-scroll items-center no-scrollbar px-4 pt-8 sm:pt-16">
        <img src="/turefri-logo.png" className="w-56 pb-8" style={{ aspectRatio: '55/20'}} />
        <QRScanner />
    </div>
);
}