// src/app/profile/page.jsx

'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Input, Button, Card } from '@material-tailwind/react';
import apiClient from '../../utils/apiClient';

const UserProfile = () => {
  const { data: session } = useSession();
  const [userProfile, setUserProfile] = useState({
    name: '',
    first_name: '',
    address: '',
    postal_code: '',
    city: '',
    siren: '',
    bic: '',
    iban: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserProfile({ ...userProfile, [name]: value });
  };

  const handleUpdateProfile = async () => {
    try {
      await apiClient.patch(
        `/api/user/update/${session.user.uid}/`,
        userProfile,
      );
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiClient.get(
          `/api/user/retrieve/${session.user.uid}/`,
        );
        setUserProfile({
          name: response.name,
          first_name: response.first_name,
          address: response.address,
          postal_code: response.postal_code,
          city: response.city,
          siren: response.siren,
          bic: response.bic,
          iban: response.iban,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (session) {
      fetchUserData();
    }
  }, [session]);

  return (
    <div>
      <Card className="m-4 p-4">
        <h2 className=" text-2xl">User Profile</h2>
        <form className="flex flex-col gap-4">
          <Input
            type="text"
            size="lg"
            placeholder="Last name"
            name="name"
            value={userProfile.name || ''}
            onChange={handleInputChange}
          />
          <Input
            type="text"
            size="lg"
            placeholder="First name"
            name="first_name"
            value={userProfile.first_name || ''}
            onChange={handleInputChange}
          />
          <Input
            type="text"
            size="lg"
            placeholder="Address"
            name="address"
            value={userProfile.address || ''}
            onChange={handleInputChange}
          />
          <Input
            type="text"
            size="lg"
            placeholder="Postal Code"
            name="postal_code"
            value={userProfile.postal_code || ''}
            onChange={handleInputChange}
          />
          <Input
            type="text"
            size="lg"
            placeholder="City"
            name="city"
            value={userProfile.city || ''}
            onChange={handleInputChange}
          />
          <Input
            type="text"
            size="lg"
            placeholder="SIREN"
            name="siren"
            value={userProfile.siren || ''}
            onChange={handleInputChange}
          />
          <Input
            type="text"
            size="lg"
            placeholder="BIC"
            name="bic"
            value={userProfile.bic || ''}
            onChange={handleInputChange}
          />
          <Input
            type="text"
            size="lg"
            placeholder="IBAN"
            name="iban"
            value={userProfile.iban || ''}
            onChange={handleInputChange}
          />
          <Button color="green" size="regular" onClick={handleUpdateProfile}>
            Update Profile
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default UserProfile;
