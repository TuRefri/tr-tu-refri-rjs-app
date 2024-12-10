
import EventList from '../components/EventsList'
import { useFridgeContext } from '../context/fridge-color-context'

export default function Events() {
  const { currentColor } = useFridgeContext()
  return (
    <div className='w-full h-full pb-10 px-4 flex flex-col items-center pt-12'>
      <h1 style={{color: currentColor.textPrimaryColor}} className='w-full text-3xl font-medium px-1'>Eventos en tu zona</h1>
      <section className='w-full h-full mt-2 pt-2'>
        <EventList />
      </section>
    </div>
  )
}
