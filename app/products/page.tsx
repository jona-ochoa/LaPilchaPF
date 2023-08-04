"use client"
import React, { useEffect, useState } from "react";
import ProductList from "../../components/ProductList";
import ProductFilter from "components/ProductFilter";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { User } from "../../GlobalRedux/api/usersApi";
import { setUsers } from "GlobalRedux/features/usersSlice";
import { useGetUsersQuery } from "../../GlobalRedux/api/usersApi";
import AccessDenied from "../../components/AccessDenied";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { data, error, isLoading, isFetching } = useGetUsersQuery();
  const [usersData, setUsersData] = useState<User[]>([]);
  const { data: sessionData } = useSession();

  useEffect(() => {
    if (data) {
      const users = data as User[];
      setUsersData(users);
      dispatch(setUsers(users));
    }
  }, [data, dispatch]);

  const currentUser = usersData.find((user) => user.email === sessionData?.user?.email);

  return (
    <div>
      {currentUser && currentUser.isBanned ? (
        <AccessDenied />
      ) : (
        <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
          <ProductFilter />
          <ProductList />
        </div>
      )}
    </div>
  );
};

export default ProductsPage;


