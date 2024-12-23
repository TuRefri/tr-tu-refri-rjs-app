import React, { useState } from "react";
import WebcamCapture from "./WebcamCapture";
import jsQR from 'jsqr';
import { useFridgeContext } from "../../context/fridge-color-context";


const QRScanner = () => {
    const {currentColor} = useFridgeContext()
    const [qrCode, setQrCode] = useState("");

    const handleScan = (imageSrc) => {
        if (imageSrc) {
            const image = new Image();
            image.src = imageSrc;
            image.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = image.width;
                canvas.height = image.height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const code = jsQR(imageData.data, imageData.width, imageData.height, { inversionAttempts: "dontInvert"});
                if (code) {
                    setQrCode(code.data);
                    console.log("code: ", code);
                }
            }
        }
    }

    return (
        <div>
            <WebcamCapture onScan={handleScan} />
            <p style={{ color: currentColor.textPrimaryColor}} className="pt-8 text-xl">{qrCode}</p>
        </div>
    );
}

export default QRScanner;