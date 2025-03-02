import React from 'react'
import EmployeeManagementCard from './EmployeeManagementCard'

const EmployeeManagementSlider = ({ employees, cardDeleteOnClick, cardUpdateOnClick }) => {

  return (
    <div className="overflow-x-auto py-4">
      <div className="flex">
        {employees.map(employee => (
          <EmployeeManagementCard key={employee.id} employee={employee} onUpdate={cardUpdateOnClick} onDelete={cardDeleteOnClick} />
        ))}
      </div>
    </div>
  );
}

export default EmployeeManagementSlider