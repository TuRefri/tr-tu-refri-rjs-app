import { motion } from 'framer-motion';
import StoreCard from './StoreCard';
import { MagnetRefriProps } from '../types';
interface StoreListProps {
    stores: MagnetRefriProps[]
}
export default function StoreList({ stores }: StoreListProps ) {
  const variants = {
    hidden: { opacity: 0, y: -100 },  
    visible: (index : number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: index * .1 },
    }),
  };



  return (
    <section className='w-full h-full mt-2 pt-2'>
      <ul className='flex flex-col gap-y-3 overflow-y-scroll no-scrollbar h-full pb-20'>
        {stores.map((item, index) => (
          <motion.li
            key={item.id}
            variants={variants}
            initial="hidden"
            animate="visible"
            custom={index} 
          >
            <StoreCard data={item}/>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
