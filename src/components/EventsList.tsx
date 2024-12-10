
import { motion } from 'framer-motion'
import EventCard from './EventCard';
import useGetEvents from '../hooks/useGetEvents'
import useGetS3Data from '../hooks/useGetS3Data';
import SimpleLoadingComponent from './SimpleLoadingComponent';
export default function EventList() {
  const variants = {
    hidden: { opacity: 0, y: -100 },  
    visible: (index : number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: index * .1 },
    }),
  };
  const { events, loadingEvents } = useGetEvents('3')
  const { awsS3Name, awsS3Region } = useGetS3Data()
  return (
    <ul className='flex flex-col gap-y-3 overflow-y-scroll no-scrollbar h-full pb-20'>
      {loadingEvents? 
      <SimpleLoadingComponent loadingText='Cargando eventos' size='20'/>
      :
      events.map((item, index) => (
        <motion.li
          key={item.id}
          variants={variants}
          initial="hidden"
          animate="visible"
          custom={index} 
        >
          <EventCard data={item} awsS3Region={awsS3Region} awsS3Name={awsS3Name}/>
        </motion.li>
      ))
       }
        
      </ul>
  )
}
