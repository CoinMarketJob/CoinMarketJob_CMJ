import React, { useState } from 'react';
import './Account.css';
import Button from '../components/general/Button';

const Account: React.FC = () => {
  const [clickedButton, setClickedButton] = useState<string | null>(null);

  const handleButtonClick = (buttonName: string) => {
    setClickedButton(buttonName);
    console.log(`${buttonName} clicked`);
  };

  return (
    <div className="account">
      <div className="account-section">
        <div className="account-item">
          <div>
            <span>Name Surname</span>
          </div>
          <Button
            text="Logout"
            onClick={() => handleButtonClick('Logout')}
            backgroundColor="#FFFFFF"
            textColor="#242220"
            borderLine={1}
            borderColor={clickedButton === 'Logout' ? '#242220' : '#E7E5E4'}
            fontSize={15}
            fontWeight={500}
            paddingTop={15}
            paddingBottom={15}
            paddingLeft={35}
            paddingRight={35}
          />
        </div>
        <div className="account-item">
          <div>
            <span>Email address</span>
            <div className="account-subtext">you@email.com</div>
          </div>
          <Button
            text="Change"
            onClick={() => handleButtonClick('Change')}
            backgroundColor="#FFFFFF"
            textColor="#242220"
            borderLine={1}
            borderColor={clickedButton === 'Change' ? '#242220' : '#E7E5E4'}
            fontSize={15}
            fontWeight={500}
            paddingTop={15}
            paddingBottom={15}
            paddingLeft={35}
            paddingRight={35}
          />
        </div>
        <div className="account-item">
          <div>
            <span>Profile URL</span>
            <div className="account-subtext">www.coinmarketjob.com/namesurname</div>
          </div>
          <Button
            text="Edit"
            onClick={() => handleButtonClick('Edit')}
            backgroundColor="#FFFFFF"
            textColor="#242220"
            borderLine={1}
            borderColor={clickedButton === 'Edit' ? '#242220' : '#E7E5E4'}
            fontSize={15}
            fontWeight={500}
            paddingTop={15}
            paddingBottom={15}
            paddingLeft={35}
            paddingRight={35}
          />
        </div>
        <div className="account-item">
          <div>
            <span>Invite a friend</span>
          </div>
          <Button
            text="Invite"
            onClick={() => handleButtonClick('Invite')}
            backgroundColor="#FFFFFF"
            textColor="#242220"
            borderLine={1}
            borderColor={clickedButton === 'Invite' ? '#242220' : '#E7E5E4'}
            fontSize={15}
            fontWeight={500}
            paddingTop={15}
            paddingBottom={15}
            paddingLeft={35}
            paddingRight={35}
          />
        </div>
      </div>

      <div className="danger-zone">
        <span>Danger Zone</span>
        <hr className="danger-divider" />
        <div className="account-item">
          <div>
            <span>Account</span>
          </div>
          <Button
            text="Delete"
            onClick={() => handleButtonClick('Delete')}
            backgroundColor="#FFFFFF"
            textColor="#242220"
            borderLine={1}
            borderColor={clickedButton === 'Delete' ? '#242220' : '#E7E5E4'}
            fontSize={15}
            fontWeight={500}
            paddingTop={15}
            paddingBottom={15}
            paddingLeft={35}
            paddingRight={35}
          />
        </div>
      </div>
    </div>
  );
};

export default Account;
