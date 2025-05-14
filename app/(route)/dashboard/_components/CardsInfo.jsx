/*import { PiggyBank, ReceiptText, Wallet } from 'lucide-react'
import React, { useEffect, useState } from 'react'

function CardsInfo({budgetList}) {

    const [totalBudget, setTotalBudget]=useState(0);
    const [totalSpend, setTotalSpend]=useState(0);

    useEffect(()=>{
        budgetList&&CalculateCardInfo();
    },[budgetList])
    const CalculateCardInfo=()=>{
        console.log(budgetList);
        let totalBudget_=0;
        let totalSpend_=0;

         budgetList.forEach(element => {
        totalBudget_ += Number(element.amount);
        totalSpend_ += Number(element.totalSpend);
      });

        setTotalBudget(totalBudget_);
        setTotalSpend(totalSpend_);


        console.log(totalBudget_,totalSpend_);
        
    }

  return (
    <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        <div className='p-7 border rounded-lg flex items-center justify-between'> 
            <div>
                <h2 className='text-sm'>Total Budget</h2>
                <h2 className='text-2xl font-bold'>₹{totalBudget}</h2>
            </div>
            <PiggyBank className='bg-primary p-3 h-12 w-12
            rounded-full text-white'/>
        </div>
        
        <div className='p-7 border rounded-lg flex items-center justify-between'> 
            <div>
                <h2 className='text-sm'>Total Spent</h2>
                <h2 className='text-2xl font-bold'>₹{totalSpend}</h2>
            </div>      
            <ReceiptText className='bg-primary p-3 h-12 w-12
            rounded-full text-white'/>
        </div>

        <div className='p-7 border rounded-lg flex items-center justify-between'> 
            <div>
                <h2 className='text-sm'>No.of Budget</h2>
                <h2 className='text-2xl font-bold'>{budgetList.length}</h2>
            </div>
            <Wallet className='bg-primary p-3 h-12 w-12
            rounded-full text-white'/>
        </div>
    </div>
  ) 
}

export default CardsInfo
*/

import { PiggyBank, ReceiptText, Wallet } from 'lucide-react'
import React, { useEffect, useState } from 'react'

function CardsInfo({ budgetList }) {
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);

  // Utility to clean strings like "₹5,174" or undefined/null values
  const cleanNumber = (val) => {
    if (!val) return 0;
    return parseInt(val.toString().replace(/[^\d]/g, '')) || 0;
  };

  const CalculateCardInfo = () => {
    let totalBudget_ = 0;
    let totalSpend_ = 0;

    console.log("Full Budget List:", budgetList);

    budgetList.forEach((element, index) => {
      console.log(`Budget ${index}:`, element);

      const amount = cleanNumber(element.amount);

      // Handles cases where totalSpend is nested or directly present
      let spend = 0;
      if (element.totalSpend !== undefined) {
        spend = cleanNumber(element.totalSpend);
      } else if (element.stats?.totalSpend) {
        spend = cleanNumber(element.stats.totalSpend);
      }

      console.log(`Parsed - Amount: ${amount}, Spend: ${spend}`);

      totalBudget_ += amount;
      totalSpend_ += spend;
    });

    setTotalBudget(totalBudget_);
    setTotalSpend(totalSpend_);

    console.log('Final Totals - Budget:', totalBudget_, 'Spend:', totalSpend_);
  };

  useEffect(() => {
    if (budgetList && budgetList.length > 0) {
      CalculateCardInfo();
    }
  }, [budgetList]);

  return (
    <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
      <div className='p-7 border rounded-lg flex items-center justify-between'>
        <div>
          <h2 className='text-sm'>Total Budget</h2>
          <h2 className='text-2xl font-bold'>₹{totalBudget}</h2>
        </div>
        <PiggyBank className='bg-primary p-3 h-12 w-12 rounded-full text-white' />
      </div>

      <div className='p-7 border rounded-lg flex items-center justify-between'>
        <div>
          <h2 className='text-sm'>Total Spent</h2>
          <h2 className='text-2xl font-bold'>₹{totalSpend}</h2>
        </div>
        <ReceiptText className='bg-primary p-3 h-12 w-12 rounded-full text-white' />
      </div>

      <div className='p-7 border rounded-lg flex items-center justify-between'>
        <div>
          <h2 className='text-sm'>No. of Budgets</h2>
          <h2 className='text-2xl font-bold'>{budgetList?.length || 0}</h2>
        </div>
        <Wallet className='bg-primary p-3 h-12 w-12 rounded-full text-white' />
      </div>
    </div>
  );
}

export default CardsInfo;
