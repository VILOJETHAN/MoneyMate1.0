import React from 'react'
import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from 'recharts'

function BarChartDashboard({budgetList}) {
  return (
    <div className='border rounded-lg p-5 mt-5'>
      <h2 className='text-2xl font-bold'>Activity</h2>
      <BarChart
        width={700}
        height={400}
        data={budgetList}
        margin={{
          top: 1,
          right: 1,
          left: 5,
          bottom: 1,
        }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalSpent" stackId="a" fill="#8884d8" />
        <Bar dataKey="amount" stackId="a" fill="#C3C2ff" />

      </BarChart>
    </div>
  )
}

export default BarChartDashboard