'use client'
import { calcBill } from '@/redux/slices/bill-slice';
import { AppDispatch, useStoreSelector } from '@/redux/store';
import { Bill } from '@/types/bill';
import Image from 'next/image';
import React, { ChangeEvent, RefObject, useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux';

export type BillForForm = {
    amount: number | string,
    tip: number | string,
    numOfPeople: number | string,
}

export default function BillForm() {
    const tipPercents:number[] = [5, 10, 15, 25, 50];

    const dispatcher = useDispatch<AppDispatch>();
    const billState = useStoreSelector(state => state.bill);

    const [isFirst, setIsFirst] = useState<Boolean>(true);
    const [bill, setBill] = useState<BillForForm>({ tip: 0 } as BillForForm);
    const [isFormDirty, setIsFormDirty] = useState<Boolean>(false);
    const [customTip, setCustomTip] = useState<number|string>('');

    const updateBill = (newBill: Bill)=>{
        setBill(newBill);
        dispatcher(calcBill(newBill))
    }

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setIsFormDirty(true);

        const { name, value } = e.target;
        const newBill: Bill = { ...bill, [name]: Number.parseFloat(value) } as Bill
        if(name === 'tip'){ setCustomTip(e.target.value) }
        updateBill(newBill);
    }

    const handleOnClickTip = (tipPercent: number) => {
        updateBill({ ...bill, tip: tipPercent } as Bill);
    }

    useEffect(() => {
        
        if(!isFirst && billState.bill == undefined){
            setBill({amount:'', numOfPeople:'', tip:0 } as BillForForm);
            setCustomTip('');
            setIsFormDirty(false);
        }
        setIsFirst(false);
        console.log('====================================');
        console.log('billState.bill', billState.bill);
        console.log('====================================');
    }, [billState.bill])
    

    return <form className='flex-1 rounded-xl mobile:mb-6 flex flex-col'>

        <div className='mb-6'>
            <div className='flex justify-between items-center text-xs mb-1'>
                <label className='text-dim text-xs' htmlFor="amount">Bill</label>
                <span className='text-red-500'>
                    {
                       isFormDirty && (Number.parseFloat(bill.amount?.toString()) === 0 ? 'Can\'t be zero' : !bill.amount && 'Can\'t be empty')
                    }
                </span>



            </div>
            <div className='relative'>
                <input type="number" name="amount" id="amount" className='w-full bg-gray-100 rounded-md py-1 pl-5 pr-3 outline-primary text-right' placeholder='0' value={bill.amount} onChange={handleOnChange} />
                <Image src='/icon-dollar.svg' className='absolute top-2.5 left-2' alt='logo' width={8} height={8} />
            </div>
        </div>

        <div className='mb-6'>
            <label htmlFor="tip" className='text-dim text-xs'>Select Tip %</label>
            <div className='mt-2 grid grid-cols-3 mobile:grid-cols-2 gap-3'>
                {
                    tipPercents.map((tipPercent) => {
                        return <div
                            key={tipPercent}
                            className={`rounded-md p-2 hover:bg-primary hover:text-secondary cursor-pointer text-center ${bill.tip === tipPercent ? 'bg-primary text-secondary' : 'bg-secondary text-white'} `}
                            onClick={()=>{handleOnClickTip(tipPercent)}}
                        >
                            {tipPercent}%
                        </div>
                    })
                }
                <input type="number" name="tip" id="tip" className='w-full bg-gray-100 rounded-md py-1 px-3 outline-primary text-right' placeholder='Custom' value={customTip} onChange={handleOnChange} />
            </div>
        </div>

        <div className=''>
            <div className='flex justify-between items-center text-xs mb-1'>
                <label className='text-dim text-xs' htmlFor="numOfPeople">Number of People</label>
                <span className='text-red-500'>
                    {
                        isFormDirty && (Number.parseFloat(bill.numOfPeople?.toString()) === 0 ? 'Can\'t be zero' : !bill.numOfPeople && 'Can\'t be empty')
                    }
                </span>
            </div>
            <div className='relative'>
                <input type="number" name="numOfPeople" id="numOfPeople" className='w-full bg-gray-100 rounded-md py-1 pl-5 pr-3 outline-primary text-right' placeholder='0' value={bill.numOfPeople} onChange={handleOnChange} />
                <Image src='/icon-person.svg' className='absolute top-2.5 left-2' alt='logo' width={8} height={8} />
            </div>
        </div>

    </form>

}
