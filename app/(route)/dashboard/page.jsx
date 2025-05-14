/*'use client'
import { UserButton, useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import CardsInfo from './_components/CardsInfo';
import { db } from '@/utils/dbConfig';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { Budgets, Expenses } from '@/utils/schema';
import BarChartDashboard from './_components/BarChartDashboard';
import BudgetItem from './budgets/_components/BudgetItem';
import ExpenseListTable from './expenses/_components/ExpenseListTable';

function Dashboard() {

  const {user} = useUser();

  const [budgetList, setBudgetList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);

  
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
      getAllExpenses();
    };

    
    const getAllExpenses = async () => {
      const result = await db.select({
        id:Expenses.id,
        name:Expenses.name,
        amount:Expenses.amount,
        createdAt:Expenses.createdAt
        
      }).from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(Expenses.id));
  
      setExpenseList(result);

    };

  return (
    <div className='p-8'>
      <h2 className='text-3xl font-bold'>Hi,{user?.firstName}✌️ </h2>
      <p className='text-grey-400'>Let's get started by creating your first budget and 
        get a clear overview of your finances</p>

        <CardsInfo budgetList={budgetList}/>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='md:col-span-2'>
            <BarChartDashboard
            budgetList={budgetList}
            />

            <ExpenseListTable
            expenseList={expenseList}
            refreshData={getBudgetList}
            />

          </div>

          <div className='mt-5 mb-0'>
            <h2 className='font-bold text-3xl'>Latest Budgets</h2>
            {budgetList.map((budget,index) => (
              <BudgetItem budget={budget} key={index}/>
            ))}
          </div>
        </div>
    </div>
  );
}

export default Dashboard;
*/

'use client'
import { UserButton, useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import CardsInfo from './_components/CardsInfo';
import { db } from '@/utils/dbConfig';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { Budgets, Expenses } from '@/utils/schema';
import BarChartDashboard from './_components/BarChartDashboard';
import BudgetItem from './budgets/_components/BudgetItem';
import ExpenseListTable from './expenses/_components/ExpenseListTable';

function Dashboard() {
  const { user } = useUser();
  const [budgetList, setBudgetList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);

  useEffect(() => {
    if (user) {
      getBudgetList();
    }
  }, [user]);

  const getBudgetList = async () => {
    const result = await db.select({
      ...getTableColumns(Budgets),
      totalSpent: sql`COALESCE(SUM(${Expenses.amount}), 0)`.mapWith(Number),
      totalItems: sql`COUNT(${Expenses.id})`.mapWith(Number)
    })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id);

    setBudgetList(result);
    getAllExpenses();
  };

  const getAllExpenses = async () => {
    const result = await db.select({
      id: Expenses.id,
      name: Expenses.name,
      amount: Expenses.amount,
      createdAt: Expenses.createdAt
    })
      .from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(Expenses.id));

    setExpenseList(result);
  };

  return (
    <div className='p-8'>
      <h2 className='text-3xl font-bold'>Hi, {user?.firstName} ✌️</h2>
      <p className='text-grey-400'>
        Let's get started by creating your first budget and get a clear overview of your finances
      </p>

      <CardsInfo budgetList={budgetList} />

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='md:col-span-2'>
          <BarChartDashboard budgetList={budgetList} />

          <ExpenseListTable
            expenseList={expenseList} // ✅ Corrected prop name
            refreshData={getBudgetList}
          />
        </div>

        <div className='mt-5 mb-0'>
          <h2 className='font-bold text-3xl'>Latest Budgets</h2>
          {budgetList.map((budget, index) => (
            <BudgetItem budget={budget} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
