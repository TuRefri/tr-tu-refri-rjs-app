import { useState } from 'react';
import { Event } from '../types';

interface EventCardProps {
    data: Event;
    awsS3Name: string;
    awsS3Region: string;
}

export default function EventCard({ data, awsS3Name, awsS3Region }: EventCardProps) {
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const handleImageLoad = () => {
        setIsImageLoaded(true);
    };

    const formatDate = (isoDate: string) => {
        const date = new Date(isoDate);
        const day = date.getDate();
        const month = date.toLocaleString('es-ES', { month: 'long' }); // Obtiene el mes en español
        return `${day} de ${month} `;
    };

    const formatTime = (isoDate: string) => {
        const date = new Date(isoDate);
        return date.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <article className='shadow-sm cursor-pointer w-full max-w-sm rounded-lg bg-gray-50 overflow-hidden'>
            <div className="relative w-full bg-gray-300 rounded-t-md">
                {!isImageLoaded && (
                    <div role="status" className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
                        <div className="flex items-center justify-center w-full h-48 bg-gray-200 rounded sm:w-96 dark:bg-gray-400">
                            <svg
                                className="w-10 h-10 text-gray-200 dark:text-gray-300"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 18"
                            >
                                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                            </svg>
                        </div>
                    </div>
                )}
                <img
                    src={`https://${awsS3Name}.s3.${awsS3Region}.amazonaws.com/${data.image}`}
                    alt="event image"
                    className={`w-full h-auto object-cover ${isImageLoaded ? 'block' : 'hidden'}`}
                    onLoad={handleImageLoad}
                />
            </div>
            <div className='flex flex-col pt-2 pb-4 px-4'>
                <section className='relative w-full'>
                    <h1 className='font-semibold text-lg'>{data.title}</h1>
                </section>
                <section className='flex flex-col gap-y-1 text-xs text-gray-600 font-medium pt-1 w-full justify-end'>
                    <p className='flex items-center gap-x-1'>
                        <img height={18} width={18} src='/icons/calendar.svg' alt='clock icon' />
                        {formatDate(data.date)} | {formatTime(data.date)}
                    </p>
                    <p className='flex items-center gap-x-1'>
                        <img height={18} width={18} src='/icons/location_event.svg' alt='location icon' />
                        {data.location}
                    </p>
                </section>
            </div>
        </article>
    );
}
