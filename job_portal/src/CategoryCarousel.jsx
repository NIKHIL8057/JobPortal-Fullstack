// import React from 'react'

// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './components/ui/carousel'
// import { Button } from './components/ui/button'
// import { useNavigate } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
// import { setSearchedQuery } from './redux/jobSlice'

// const category = [
//     "Frontend Developer",
//     "Backend Developer",
//     "Graphic Designer",
//     "Data Science",
//     "Flutter Developer",
//     "React Devloper",
//     "Fullstack Developer"
// ]

// const CategoryCarousel = () => {

//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const searchJobHandler = (query) => {
//           dispatch(setSearchedQuery(query))
//           navigate('/browse')
//       }

//     return (
//         <div>
//             <Carousel className="w-full max-w-xl mx-auto my-16">
//                 <CarouselContent>
//                     {
//                         category.map((cat, index) => (
//                             <CarouselItem className="md:basis-1/2 lg-basis-1/3">
//                                 <Button onClick={()=>searchJobHandler(cat)} variant="outline"  className="rounded-full">{cat}</Button>
//                             </CarouselItem>
//                         ))
//                     }
//                 </CarouselContent>
//                 <CarouselPrevious />
//                 <CarouselNext />
//             </Carousel>
//         </div>
//     )
// }

// export default CategoryCarousel

import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './components/ui/carousel'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from './redux/jobSlice'

const categories = [
  { label: "Frontend Developer",  color: "from-violet-500 to-purple-600" },
  { label: "Backend Developer",   color: "from-blue-500 to-cyan-500" },
  { label: "Graphic Designer",    color: "from-pink-500 to-rose-500" },
  { label: "Data Science",        color: "from-green-500 to-emerald-500" },
  { label: "Flutter Developer",   color: "from-sky-500 to-blue-600" },
  { label: "React Developer",     color: "from-cyan-500 to-teal-500" },
  { label: "Fullstack Developer", color: "from-orange-500 to-[#F83002]" },
]

const CategoryCarousel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchJobHandler = (query) => { dispatch(setSearchedQuery(query)); navigate('/browse') }

  return (
    <div className='text-center my-14'>
      <p className='text-sm text-gray-400 font-medium mb-6 tracking-widest uppercase'>Browse by Category</p>
      <Carousel className="w-full max-w-2xl mx-auto">
        <CarouselContent className='px-2'>
          {categories.map(({ label, color }) => (
            <CarouselItem key={label} className="basis-auto pl-3">
              <button onClick={() => searchJobHandler(label)}
                className={`px-5 py-2.5 rounded-full bg-gradient-to-r ${color} text-white text-sm font-medium shadow-md hover:scale-105 hover:shadow-lg transition-all duration-200 whitespace-nowrap`}>
                {label}
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='border-gray-200 hover:bg-[#6A38C2] hover:text-white hover:border-[#6A38C2] transition-colors' />
        <CarouselNext className='border-gray-200 hover:bg-[#6A38C2] hover:text-white hover:border-[#6A38C2] transition-colors' />
      </Carousel>
    </div>
  )
}

export default CategoryCarousel