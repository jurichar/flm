// src/app/profile/page.jsx

'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Input, Button, Card } from '@material-tailwind/react';
import apiClient from '../../utils/apiClient';

const UserProfile = () => {
  const { data: session } = useSession();
  const [userProfile, setUserProfile] = useState({
    last_name: '',
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
        session.accessToken,
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
          session.accessToken,
        );
        setUserProfile({
          last_name: response.last_name,
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
            name="first_name"
            onChange={handleInputChange}
            placeholder="First name"
            size="lg"
            type="text"
            value={userProfile.first_name || ''}
          />
          <Input
            name="last_name"
            onChange={handleInputChange}
            placeholder="Last name"
            size="lg"
            type="text"
            value={userProfile.last_name || ''}
          />
          <Input
            name="address"
            onChange={handleInputChange}
            placeholder="Address"
            size="lg"
            type="text"
            value={userProfile.address || ''}
          />
          <Input
            name="postal_code"
            onChange={handleInputChange}
            placeholder="Postal Code"
            size="lg"
            type="text"
            value={userProfile.postal_code || ''}
          />
          <Input
            name="city"
            onChange={handleInputChange}
            placeholder="City"
            size="lg"
            type="text"
            value={userProfile.city || ''}
          />
          <Input
            name="siren"
            onChange={handleInputChange}
            placeholder="SIREN"
            size="lg"
            type="text"
            value={userProfile.siren || ''}
          />
          <Input
            name="bic"
            onChange={handleInputChange}
            placeholder="BIC"
            size="lg"
            type="text"
            value={userProfile.bic || ''}
          />
          <Input
            name="iban"
            onChange={handleInputChange}
            placeholder="IBAN"
            size="lg"
            type="text"
            value={userProfile.iban || ''}
          />
          <Button color="green" onClick={handleUpdateProfile} size="regular">
            Update Profile
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default UserProfile;
