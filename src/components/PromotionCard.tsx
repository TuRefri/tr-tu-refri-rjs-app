interface PromotionCardProps {
    data : any
}

const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };
    return new Date(date).toLocaleDateString('es-CO', options);
  };

export default function PromotionCard({data} : PromotionCardProps) {
    console.log(data)
    const formattedDate = formatDate(data.endDate);
    
  return (
    <article className='shadow-sm cursor-pointer w-full rounded-lg border bg-gray-50'>
        <div className="flex items-center justify-center w-full h-32 bg-gray-300 rounded-t-md dark:bg-gray-300">
            <svg className="w-10 h-10 text-gray-200 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
            </svg>
        </div>
        <div className='flex flex-col pt-2 pb-4 px-4'>
                <section className='relative w-full'>
                    <h1 className='font-semibold text-md'>{data.title}</h1>
                </section>
                <section className='flex flex-col gap-y-1 text-xs text-gray-600 font-regular pt-1 w-full justify-end'>
                    <p className='flex items-center gap-x-1'>{data.description}</p>
                    <p className='pt-4 font-light gap-x-1 text-[9px] w-full text-end'>Hasta {formattedDate}</p>
                </section>
            </div>
    </article>
  )
}
