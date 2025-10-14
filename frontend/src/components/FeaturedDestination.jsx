// import React from 'react'
// import HotelCard from './HotelCard'
// import Title from './Title'
// import { useAppContext } from '../context/AppContext'

// const FeaturedDestination = () => {
//   const {rooms,navigate} = useAppContext();
//   return rooms.length > 0 && (
//     <div className='flex flex-wrap items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20'>
//         <Title title='Featured Destination' subTitle='Discover our handpicked selection of exceptional properties around the country, offering unparalleled luxury and unforgettable experiences.'/>
//       <div className='flex flex-wrap items-center justify-center gap-6 mt-20'>
//         {rooms.slice(0,4).map((room,index)=>(
//             <HotelCard key={room._id} room={room} index={index} />
//         ))}
//       </div>
//       <button onClick={()=>{navigate('/rooms'); scrollTo(0,0)}} className='my-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-50 transition-all cursor-pointer '>
//         View All Destination
//       </button>
//     </div>
//   )
// }

// export default FeaturedDestination
import React from 'react'
import HotelCard from './HotelCard'
import Title from './Title'
import { useAppContext } from '../context/AppContext'

const FeaturedDestination = () => {
  const { rooms, navigate } = useAppContext();

  return rooms.length > 0 && (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20'>
      {/* Title Section */}
      <div className='text-center max-w-3xl mb-10'>
        <Title 
          title='Featured Destination' 
          subTitle='Discover our handpicked selection of exceptional properties around the country, offering unparalleled luxury and unforgettable experiences.' 
        />
      </div>

      {/* Rooms Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl'>
        {rooms.slice(0, 4).map((room, index) => (
          <HotelCard key={room._id} room={room} index={index} />
        ))}
      </div>

      {/* View All Button */}
      <div className='mt-14'>
        <button
          onClick={() => {
            navigate('/rooms');
            scrollTo(0, 0);
          }}
          className='px-6 py-3 text-base font-medium border border-gray-300 rounded-lg bg-white hover:bg-gray-100 transition-all shadow-sm hover:shadow-md cursor-pointer'
        >
          View All Destinations
        </button>
      </div>
    </div>
  )
}

export default FeaturedDestination
