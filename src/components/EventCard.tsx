
import { Event } from '../types';

interface EventCardProps {
    data: Event;
}

export default function EventCard({ data }: EventCardProps) {
    return (
        <article className='shadow-sm cursor-pointer w-full max-w-sm rounded-lg border bg-gray-50 overflow-hidden'>
            <div className="flex items-center justify-center w-full bg-gray-300 rounded-t-md">
                <img 
                    src={`images/events/${data.image}`} 
                    alt='event image' 
                    className='w-full h-auto object-cover'
                />
            </div>
            <div className='flex flex-col pt-2 pb-4 px-4'>
                <section className='relative w-full'>
                    <h1 className='font-semibold text-lg'>{data.name}</h1>
                </section>
                <section className='flex flex-col gap-y-1 text-xs text-gray-600 font-medium pt-1 w-full justify-end'>
                    <p className='flex items-center gap-x-1'><img height={18} width={18} src='/icons/clock.svg' alt='event image'/>{data.day}</p>
                    <p className='flex items-center gap-x-1'><img height={18} width={18} src='/icons/calendar.svg' alt='event image'/>{data.hour}</p>
                    <p className='flex items-center gap-x-1'><img height={18} width={18} src='/icons/location_event.svg' alt='event image'/>{data.location}</p>
                </section>
            </div>
        </article>

    );
}
