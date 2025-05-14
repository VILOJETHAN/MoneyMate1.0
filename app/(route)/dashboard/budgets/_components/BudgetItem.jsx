
/*import Link from 'next/link'

import React from 'react'

function BudgetItem({ budget }) {
    return (
        <Link href={'/dashboard/expenses/'+budget?.id} 
        className='p-5 border rounded-lg hover:shadow-md 
        cursor-pointer hover:bg-slate-100 h-[170px]'>
            <div className='flex gap-2 items-center justify-between'>
                <div className='flex gap-2 items-center'>
                    <h2 className='text-2xl p-3 px-4 
                     bg-slate-100 rounded-full'
                    >{budget?.icon}</h2>
                    <div>
                        <h2 className='text-bold'>{budget?.name}</h2>
                        <h2 className='text-sm text-grey-400'>{budget?.totalItems} Item</h2>
                    </div>
                </div>
                <h2 className='text-lg text-primary font-bold'>₹{budget?.amount}</h2>
            </div>

            <div className='mt-5'>
                <div className='flex justify-between items-center mb-3'>
                    <h2 className='text-xs text-slate-400'>₹{budget.totalSpend?budget.totalSpend:0} Spend</h2>
                    <h2 className='text-xs text-slate-400'>₹{budget.amount-budget.totalSpend} Remaining</h2>
                </div>
                <div className='w-full bg-slate-300 h-2 rounded-full'> 
                    <div className='w-[40%] bg-primary h-2 rounded-full'> 

                </div>
                </div>
            </div>

        </Link>
    )
}

export default BudgetItem
*/


import Link from 'next/link';
import React from 'react';

function BudgetItem({ budget }) {
    const totalSpent = budget.totalSpent ?? 0;
    const remaining = budget.amount - totalSpent;
    const percentageSpent = budget.amount > 0
        ? Math.min((totalSpent / budget.amount) * 100, 100)
        : 0;

    return (

        <Link href={'/dashboard/expenses/' + budget?.id}>
            <div className='p-5 border rounded-lg hover:shadow-md 
            cursor-pointer hover:bg-slate-100 h-[170px]'>
                <div className='flex gap-2 items-center justify-between'>
                    <div className='flex gap-2 items-center'>
                        <h2 className='text-2xl p-3 px-4 bg-slate-100 rounded-full'>
                            {budget?.icon}
                        </h2>
                        <div>
                            <h2 className='font-bold'>{budget?.name}</h2>
                            <h2 className='text-sm text-gray-400'>
                                {budget?.totalItems ?? 0} Item{budget?.totalItems === 1 ? '' : 's'}
                            </h2>
                        </div>
                    </div>
                    <h2 className='text-lg text-primary font-bold'>₹{budget?.amount}</h2>
                </div>

                <div className='mt-5'>
                    <div className='flex justify-between items-center mb-3'>
                        <h2 className='text-xs text-slate-400'>₹{totalSpent} Spent</h2>
                        <h2 className='text-xs text-slate-400'>₹{remaining} Remaining</h2>
                    </div>
                    <div className='w-full bg-slate-300 h-2 rounded-full'>
                        <div
                            className='bg-primary h-2 rounded-full'
                            style={{ width: `${percentageSpent}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default BudgetItem;
