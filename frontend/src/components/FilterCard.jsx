import { Radio } from 'lucide-react'
import React from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'

const filterData = [
  {
    filterType: "Location",
    array: ["Jhapa", "Morang", "Lumbini", "kathmandu", "Dharan"]
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Devloper", "FullStack Devloper"]
  },
  {
    filterType: "Salary",
    array: ["8-40k", "42-1lakh", "1lakh to 5lakh"]
  },

]

function FilterCard() {
  return (
    <div className='w-full bg-white p-3 rounded-md'>
      <h1 className='font-bold text-lg'>Filter Jobs </h1>
      <hr className='mt-3' />
      <RadioGroup>
        {
          filterData.map((data, index) => (
            <div>
              <h1 className='font-bold text-lg'>{data.filterType}</h1>
              {
                data.array.map((item, index) => {
                  return (
                    <div className='flex items-center space-x-2 my-2'>
                      <RadioGroupItem value={item} />
                      <label>{item}</label>
                    </div>
                  )
                })
              }
            </div>
          ))
        }
      </RadioGroup>
    </div>
  )
}

export default FilterCard
