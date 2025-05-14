/*"use client"

import React, { useEffect, useState } from 'react'
import CreateBudget from './CreateBudget'
import { eq, getTableColumns, sql } from 'drizzle-orm'
import { useUser } from '@clerk/nextjs';
import { db } from '@/utils/dbConfig'
import { Budgets, Expenses } from '@/utils/schema'
import BudgetItem from './BudgetItem';

function BudgetList() {

  const [budgetList, setBudgetList]=useState([]);
  const {user}=useUser();

  useEffect(()=>{
    getBudgetList();
  },[user])

  //Used to get BudgetList
  const getBudgetList=async()=>{

    const result=await db.select({
      ...getTableColumns(Budgets),
      totalSpent: sql`COALESCE(SUM(${Expenses.amount}), 0)`.mapWith(Number),
      //totalSpent:sql`sum(${Expenses.amount})`.mapWith(Number),
      totalItems:sql`count(${Expenses.id})`.mapWith(Number)
    }).from(Budgets)
    .leftJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
    .where(eq(Budgets.createdBy,user?.primaryEmailAddress?.emailAddress))
    .groupBy(Budgets.id);
    

    setBudgetList(result);
    
  }

  return (
    <div className='mt-7'>   
        <div className='grid grid-cols-1
        md:grid-cols-2 lg:grid-cols-3 gap-5'> 
            <CreateBudget
            refreshData={()=>getBudgetList()}
            />
            {budgetList.map((budget) => (
              <BudgetItem key={budget.id} budget={budget} />
            ))}

        </div>
    </div>
  )
}

export default BudgetList
*/

"use client"

import React, { useEffect, useState } from 'react'
import CreateBudget from './CreateBudget'
import { eq, getTableColumns, sql } from 'drizzle-orm'
import { useUser } from '@clerk/nextjs';
import { db } from '@/utils/dbConfig'
import { Budgets, Expenses } from '@/utils/schema'
import BudgetItem from './BudgetItem';

function BudgetList() {
  const [budgetList, setBudgetList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      getBudgetList();
    }
  }, [user]);

  // Used to get Budget List
  const getBudgetList = async () => {
    const result = await db.select({
      ...getTableColumns(Budgets),
      totalSpent: sql`COALESCE(SUM(${Expenses.amount}), 0)`.mapWith(Number),
      totalItems: sql`COUNT(${Expenses.id})`.mapWith(Number)
    }).from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id);

    setBudgetList(result);
  };

  return (
    <div className='mt-7'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        <CreateBudget refreshData={getBudgetList} />
        
        {budgetList.map((budget) => (
          <BudgetItem 
            key={budget.id} 
            budget={budget} 
            refreshData={getBudgetList} 
          />
        ))}
      </div>
    </div>
  );
}

export default BudgetList;
