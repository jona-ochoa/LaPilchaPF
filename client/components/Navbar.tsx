'use client'
import React from 'react';
import SearchBar from './SearchBar';
import Image from 'next/image';
import {RootState} from "../GlobalRedux/store"
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useSelector } from 'react-redux';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { User, useGetUsersQuery } from 'GlobalRedux/api/usersApi';

const Navbar: React.FC = () => {
  const {data: userList} = useGetUsersQuery()
 
  console.log(userList);

  const { data: session, status } = useSession();
  const isAdminUser = userList?.find((user) => user.email === session?.user?.email)?.isAdmin;

  const handleLogout = async () => {
    await signOut();
  };

  const renderUserIcon = () => {
    if (status === 'loading') {
      return null;
    }

    if (session) {
      return (
        <>
          <Link href="/profile">
            <div className="relative w-8 h-8">
              <Image
                src={session.user?.image || ''}
                alt="User Image"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
          </Link>
          <span> {session.user?.name} </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-log-out"
            onClick={handleLogout}
            style={{ cursor: 'pointer' }}
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
        </>
      );
    }

    return (
      <Link href="/login">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path     
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </Link>
    );
  };

  return (
    <nav>
      <div className="bg-gray-900 text-white mx-auto px-5 xl:px-12 py-6 flex items-center">
        <a href="/">
          <div className="text-2xl font-semibold mr-4 tracking-widest">
            La<span className="text-3xl font-bold tracking-widest">P</span>ilcha
          </div>
        </a>

        <div className="flex-grow justify-center">
          <SearchBar />
        </div>

        <div className="flex items-center ml-auto space-x-4">
          {isAdminUser  && (
            <>
              <Link href="/admin">
                <div className="cursor-pointer">
                  <MdOutlineAdminPanelSettings className="h-6 w-6 text-white hover:text-gray-200" />
                </div>
              </Link>
            </>
          )}
          {isAdminUser  && (
            <Link href="/formProduct">
              <button
                type="button"
                className="inline-block rounded border-2 border-neutral-50 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                data-te-ripple-init
              >
                CARGAR PRODUCTO
              </button>
            </Link>
          )}

          <div className="hidden xl:flex items-center space-x-5">
            <Link href="/favoritos">
              <div className="hover:text-gray-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
            </Link>
            <Link href="/carrito">
              <div>
                <div className="flex items-center hover:text-gray-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>

                  <span className="flex absolute -mt-5 ml-4">
                    <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                  </span>
                </div>
              </div>
            </Link>
          </div>
          {renderUserIcon()}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
