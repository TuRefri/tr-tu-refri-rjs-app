import React from 'react'
import { motion } from 'framer-motion'
import EventCard from './EventCard';
import events from '../data/events.json'
export default function EventList() {
  const variants = {
    hidden: { opacity: 0, y: -100 },  
    visible: (index : number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: index * .1 },
    }),
  };

  return (
    <ul className='flex flex-col gap-y-3 overflow-y-scroll no-scrollbar h-full pb-20'>
        {events.map((item, index) => (
          <motion.li
            key={item.id}
            variants={variants}
            initial="hidden"
            animate="visible"
            custom={index} 
          >
            <EventCard data={item}/>
          </motion.li>
        ))}
      </ul>
  )
}
