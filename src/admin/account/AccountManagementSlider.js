import React, { useState } from 'react';
import AccountManagementCard from './AccountManagementCard';

const AccountManagementSlider = ({ accounts, cardUpdateOnClick }) => {

  return (
    <div className="overflow-x-auto py-4">
      <div className="flex">
        {accounts.map(account => (
          <AccountManagementCard key={account.id} account={account} onUpdate={cardUpdateOnClick}/>
        ))}
      </div>
    </div>
  );
};

export default AccountManagementSlider;
