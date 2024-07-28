// src/app/profile/page.jsx

'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import {
  Input,
  Button,
  Card,
  CardHeader,
  CardBody,
} from '@material-tailwind/react';
import apiClient from '../../utils/apiClient';

const UserProfile = () => {
  const { data: session } = useSession();
  const [userProfile, setUserProfile] = useState({
    name: '',
    address: '',
    postalCode: '',
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
      const response = await apiClient.patch(
        `/api/user/update/${session.user.uid}/`,
        userProfile,
      );
      if (response.status === 200) {
        alert('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiClient.get(
          `/api/user/retrieve/${session.user.uid}/`,
        );
        setUserProfile({
          name: response.login,
          address: response.address,
          postalCode: response.postalCode,
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
    <div className="p-4">
      <Card>
        <CardHeader color="purple" contentPosition="left">
          <h2 className="text-white text-2xl">User Profile</h2>
        </CardHeader>
        <CardBody>
          <form>
            <Input
              type="text"
              color="purple"
              size="lg"
              outline={true}
              placeholder="Name"
              name="name"
              value={userProfile.name || ''}
              onChange={handleInputChange}
            />
            <Input
              type="text"
              color="purple"
              size="lg"
              outline={true}
              placeholder="Address"
              name="address"
              value={userProfile.address || ''}
              onChange={handleInputChange}
            />
            <Input
              type="text"
              color="purple"
              size="lg"
              outline={true}
              placeholder="Postal Code"
              name="postalCode"
              value={userProfile.postalCode || ''}
              onChange={handleInputChange}
            />
            <Input
              type="text"
              color="purple"
              size="lg"
              outline={true}
              placeholder="City"
              name="city"
              value={userProfile.city || ''}
              onChange={handleInputChange}
            />
            <Input
              type="text"
              color="purple"
              size="lg"
              outline={true}
              placeholder="SIREN"
              name="siren"
              value={userProfile.siren || ''}
              onChange={handleInputChange}
            />
            <Input
              type="text"
              color="purple"
              size="lg"
              outline={true}
              placeholder="BIC"
              name="bic"
              value={userProfile.bic || ''}
              onChange={handleInputChange}
            />
            <Input
              type="text"
              color="purple"
              size="lg"
              outline={true}
              placeholder="IBAN"
              name="iban"
              value={userProfile.iban || ''}
              onChange={handleInputChange}
            />
            <Button
              color="green"
              buttonType="filled"
              size="regular"
              rounded={false}
              block={false}
              iconOnly={false}
              ripple="light"
              onClick={handleUpdateProfile}
            >
              Update Profile
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default UserProfile;
