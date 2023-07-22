'use client'
import React, { useMemo } from 'react'
import { resetBill } from '@/redux/slices/bill-slice';
import { AppDispatch, useStoreSelector } from '@/redux/store';
import { useDispatch } from 'react-redux';


export default function ResultForm() {

    const billState = useStoreSelector(state => state.bill);
    const dispatcher = useDispatch<AppDispatch>();
    
    const isDisabled = useMemo(() => {
        return !billState.totalperperson || Number.parseFloat(billState.bill?.amount?.toString()) === 0

    }, [billState])

    return <div className='flex-1 rounded-xl bg-secondary p-8 flex flex-col justify-between gap-6'>

        <section className='flex flex-col gap-6'>
            <div className='flex justify-between items-center'>
                <div className='flex flex-col'>
                    <span className='text-white text-sm'>Tip Amonunt</span>
                    <span className='text-dim text-[12px]'>/ person</span>
                </div>
                <span className='text-3xl font-bold text-primary'>
                    ${!billState.tipperperson || billState.totalperperson === Infinity ? '0.00' : billState.tipperperson.toFixed(2)}
                </span>
            </div>

            <div className='flex justify-between items-center'>
                <div className='flex flex-col'>
                    <span className='text-white text-sm'>Total</span>
                    <span className='text-dim text-[12px]'>/ person</span>
                </div>
                <span className='text-3xl font-bold text-primary'>
                    ${!billState.totalperperson || billState.totalperperson === Infinity ? '0.00' : billState.totalperperson.toFixed(2)}
                </span>
            </div>
        </section>

        <button 
            className={`w-full rounded-md py-2 text-secondary bg-primary mt-4 ${isDisabled && 'bg-opacity-20'}`}
            disabled={isDisabled}
            onClick={()=>dispatcher(resetBill())}
        >
            RESET
        </button>

    </div>
}       
