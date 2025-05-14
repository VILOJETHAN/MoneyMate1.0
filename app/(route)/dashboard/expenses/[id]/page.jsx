/*'use client'
import { db } from '@/utils/dbConfig'
import React, { useEffect, useState } from 'react'
import { Budgets, Expenses } from '@/utils/schema'
import { eq, getTableColumns, sql } from 'drizzle-orm'
import { useUser } from '@clerk/nextjs'     
import BudgetItem from '../../budgets/_components/BudgetItem'
import AddExpense from '../_components/AddExpense'

function ExpensesScreen({params}) {

    const {user}=useUser();
    const [budgetInfo,setbudgetInfo]=useState();

    useEffect(()=>{
        
        user&&getBudgetInfo();
    },[user])

    
     const getBugetInfo=async()=>{
        const result=await db.select({
              ...getTableColumns(Budgets),
              totalSpent: sql`COALESCE(SUM(${Expenses.amount}), 0)`.mapWith(Number),
              //totalSpent:sql`sum(${Expenses.amount})`.mapWith(Number),
              totalItems:sql`count(${Expenses.id})`.mapWith(Number)
            }).from(Budgets)
            .leftJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
            .where(eq(Budgets.createdBy,user?.primaryEmailAddress?.emailAddress))
            .where(eq(Budgets.id,params.id))
            .groupBy(Budgets.id);

            setbudgetInfo(result[0]);
            

    }
     

  return (
    <div>
        <h2 className='font-bold text-2xl p-5'>My Expenses</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-5'>
           {budgetInfo && (
             <BudgetItem 
             budget={budgetInfo} 
             />
            )}
            <AddExpense budgetId={params.id}
            user={user}
            refreshData={getBugetInfo}
            />
        </div>
    </div>
  )
}

export default ExpensesScreen
*/


'use client'
import { db } from '@/utils/dbConfig'
import React, { useEffect, useState } from 'react'
import { Budgets, Expenses } from '@/utils/schema'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import { useUser } from '@clerk/nextjs'
import BudgetItem from '../../budgets/_components/BudgetItem'
import AddExpense from '../_components/AddExpense'
import ExpenseListTable from '../_components/ExpenseListTable'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'



function ExpensesScreen({ params }) {

    const { user } = useUser();
    const [budgetInfo, setBudgetInfo] = useState();
    const [expensesList, setExpensesList] = useState([]);
    const route=useRouter();

    // Unwrap the params using React.use
    const paramId = React.use(params).id;

    useEffect(() => {
        if (user && paramId) {
            getBudgetInfo();
        }

    }, [user, paramId]);


    //Get Budget Info
    const getBudgetInfo = async () => {
        const result = await db.select({
            ...getTableColumns(Budgets),
            totalSpent: sql`sum(${Expenses.amount})`.mapWith(Number),
            //totalSpent: sql`COALESCE(SUM(${Expenses.amount}), 0)`.mapWith(Number),
            totalItems: sql`count(${Expenses.id})`.mapWith(Number)
        }).from(Budgets)
            .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
            .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
            .where(eq(Budgets.id, paramId))
            .groupBy(Budgets.id);

        setBudgetInfo(result[0]);
        getExpensesList();
    }

    //Get Latest Expenses
    const getExpensesList = async () => {
        const result = await db.select().from(Expenses)
            .where(eq(Expenses.budgetId, paramId))
            .orderBy(desc(Expenses.id));

        setExpensesList(result); // Set the expenses list using setExpensesList
    }

/**
 * Delete Budget
 */
    const deleteBudget=async()=>{

        const deleteExpenseResult=await db.delete(Expenses)
        .where(eq(Expenses.budgetId,paramId))
        .returning();

        if(deleteExpenseResult){
        const result=await db.delete(Budgets)
        .where(eq(Budgets.id,paramId))
        .returning();
        }
        toast('Budget Deleted Successfully!');
        route.replace('/dashboard/budgets');
    }

    return (
        <div>
            <h2 className='font-bold text-2xl p-4 flex 
            justify-between items-center'>My Expenses


                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button className='flex gap-2' variant='destructive'>
                            <Trash /> Delete
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your Budget Plan
                                and remove your data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() =>deleteBudget() }>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>


            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-5'>
                {budgetInfo && (
                    <BudgetItem
                        key={budgetInfo.id}  // Add a unique key for the BudgetItem
                        budget={budgetInfo}
                    />
                )}
                <AddExpense budgetId={paramId}
                    user={user}
                    refreshData={getBudgetInfo}
                />
            </div>
            <div className='mt-4'>
                <h2 className='font-bold text-lg p-5'>Latest Expenses</h2>
                <ExpenseListTable expensesList={expensesList}
                    refreshData={getBudgetInfo}
                />
            </div>
        </div>
    )
}

export default ExpensesScreen;
