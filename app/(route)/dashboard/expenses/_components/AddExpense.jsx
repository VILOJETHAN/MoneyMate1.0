/*import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import { create } from 'domain';
import React, { useState } from 'react'
import { toast } from 'sonner';

function AddExpense({budgetId,user,refreshData}) {

    const [name, setName] = useState();
    const [amount, setAmount] = useState(0);

    const addNewExpense=async()=>{
        const result=await db.insert(Expenses).values({
            name:name,
            amount:amount,
            budgetId:budgetId,
            createdAt:user?.primaryEmailAddress?.emailAddress
        }).returning({insertedId:Budgets.id})

        console.log(result);
        if(result){
            refreshData()
            toast('New Expense Added Successfully!!')
        }
    }

    return (
        <div className='border rounded-lg p-5'> 
            <h2 className='font-bold text-lg'>Add Expense</h2>

            <div className='mt-2'>
                <h2 className='text-black font-medium my-1'>Expense Name</h2>
                <Input 
                type='text'
                placeholder='e.g: Travel Expense'
                    onChange={(e) => setName(e.target.value)} />
            </div>
            <div className='mt-2'>
                <h2 className='text-black font-medium my-1'>Expense Amount</h2>
                <Input 
                type='number'
                placeholder='e.g: ₹1000'
                onChange={(e) => setAmount(e.target.value)} />
            </div>
            <Button  
            onClick={()=>addNewExpense()}
            className='mt-3 w-full'>Add New Expense</Button>
        </div>
    )
}

export default AddExpense

*/

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db } from '@/utils/dbConfig';
import { Expenses } from '@/utils/schema';
import moment from 'moment';
import React, { useState } from 'react';
import { toast } from 'sonner';

function AddExpense({ budgetId, user, refreshData }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  const addNewExpense = async () => {
    if (!name || !amount || isNaN(amount)) {
      toast.error('Please enter valid expense name and amount');
      return;
    }

    const result = await db.insert(Expenses).values({
      name: name.trim(),
      amount: Number(amount),
      budgetId: budgetId,
      createdAt: moment().format('DD/MM/YYYY'),
    });

    if (result) {
      toast.success('New Expense Added Successfully!');
      setName('');
      setAmount('');
      refreshData(); // Trigger parent refresh
    }
  };

  return (
    <div className='border rounded-lg p-5'>
      <h2 className='font-bold text-lg'>Add Expense</h2>

      <div className='mt-2'>
        <h2 className='text-black font-medium my-1'>Expense Name</h2>
        <Input
          type='text'
          placeholder='e.g: Travel Expense'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className='mt-2'>
        <h2 className='text-black font-medium my-1'>Expense Amount</h2>
        <Input
          type='number'
          placeholder='e.g: ₹1000'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <Button
        onClick={addNewExpense}
        className='mt-3 w-full'
      >
        Add New Expense
      </Button>
    </div>
  );
}

export default AddExpense;
