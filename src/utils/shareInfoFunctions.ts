import { MagnetsItem } from "../types/magnetGroup";
import { toast } from "sonner";
export const handleContactViaWhatsapp = (phone: string | null) => {
    if(phone === '' || !phone) return
    const phoneTransformed = phone.replace(/[\s+()-]/g, ""); 
    const whatsappURL = `https://wa.me/${phoneTransformed}`;
    window.open(whatsappURL, "_blank");
}
export const handleShareLocation = (data: MagnetsItem | null) => {
    if(!data) return
    const url = `https://${window.location.hostname}/location/${data.location.id}`;
    if (navigator.share) {
        navigator
        .share({
            title: "Enlace al local",
            text: '¡Mira este lugar increíble que encontré en Tu Refri!',
            url: url,
        })
        .then(() => console.log("Contenido compartido"))
        .catch((error) => console.error("Error al compartir:", error));
    } else {
        navigator.clipboard.writeText(`https://${window.location.hostname}/location/${data.location.id}`)
            .then(() => {
                toast.success('¡Url copiada en tu portapapeles! Ya puedes compartirlo con un amigo.', {duration: 2000,  position: 'top-center'});
            })
            .catch(() => {
                toast.success('Error al copiar en el portapapeles', {duration: 2000,  position: 'top-center'});
            });
    }
};