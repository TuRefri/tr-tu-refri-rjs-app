import React from 'react'
import EventList from '../components/EventsList'

export default function Events() {
  return (
    <div className='w-full h-full pt-6 pb-10 px-4 flex flex-col items-center'>
      <h1 className='w-full text-2xl font-semibold text-gray-700 px-1'>Eventos en tu barrio</h1>
      <section className='w-full h-full mt-2 pt-2'>
        <EventList />
      </section>
    </div>
  )
}
