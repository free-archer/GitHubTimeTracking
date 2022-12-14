import React from "react";
import { labelColor } from '../lib/componentHelpers'
import { ILabel } from '../types/dbissues'

interface IProps  {
    label:ILabel,
    setFilterLabels:React.Dispatch<React.SetStateAction<ILabel[]>>,
}
export const Filter:React.FC<IProps> = ({label, setFilterLabels}) => {

    const delLabel = ():void => {
        setFilterLabels((state) => {

            const mLabels = state.filter((el) => (el !== label))


            return mLabels
        })
    }

    return (
        <>
            <div 
                className="flex items-center h-7 border-solid border border-gray-800 rounded-full mx-1 px-2 py-1 text-xs"
                style={labelColor(label.color)} 
            >
                {label.name}
                <span onClick={delLabel} className="cursor-pointer ml-1" >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>                
                </span>
            </div>


        </>
    )
}