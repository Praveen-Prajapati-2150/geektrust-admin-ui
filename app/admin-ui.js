'use client';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import debounce from '@/utils/debounce';

export default function AdminUI() {
  const [usersData, setUsersData] = useState([]);
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(1);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [paginationButton, setPaginationButton] = useState([]);

  const fetchUsers = async () => {
    const response = await fetch(
      'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
    );
    const data = await response.json();
    setUsersData(data?.map((user) => ({ ...user, checked: false })));
  };

  const handleLimit = (page) => {
    setPage(page + 1);
    setLimit(page * 10 + 1);
  };

  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSelection = (id, checked) => {
    setData(
      data?.map((user) =>
        user.id === id ? { ...user, checked: !checked } : user
      )
    );
  };

  const handleDeleteUser = () => {
    setData(data?.filter((user) => !user.checked));

    setUsersData(
      usersData?.filter(
        (user) => !data.some((item) => item.checked && item.id === user.id)
      )
    );
  };

  const handleDirectDeleteUser = (id) => {
    setData(data?.filter((user) => user.id !== id));

    setUsersData(usersData?.filter((user) => user.id !== id));
  };

  useEffect(() => {
    let data = [...usersData];
    let res = data.slice(limit - 1, limit + 10 - 1);

    let number = Math.ceil(usersData.length / 10);
    const array = Array(number)
      .fill()
      .map((_, index) => index + 1);
    setPaginationButton(array);

    setData(res);
  }, [limit, usersData]);

  //   console.log(data);
  //   console.log(usersData);
//   console.log(paginationButton);

  useEffect(() => {
    fetchUsers();

    return () => {
      setUsersData([]);
    };
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <Input
          type="search"
          placeholder="Search by name, email or role"
          className="w-full"
          value={searchQuery}
          onChange={handleSearchQuery}
        />
      </div>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              {/* <Checkbox id="select-all" /> */}
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((user, index) => {
            if (user?.name.toLowerCase().includes(searchQuery.toLowerCase()))
              return (
                <TableRow key={index}>
                  <TableCell>
                    <Checkbox
                      checked={user.checked}
                      onCheckedChange={() =>
                        handleSelection(user.id, user.checked)
                      }
                      id={`select-${index}`}
                    />
                  </TableCell>
                  <TableCell>{user?.name}</TableCell>
                  <TableCell>{user?.email}</TableCell>
                  <TableCell>{user?.role}</TableCell>
                  <TableCell className="flex space-x-2">
                    <Button variant="ghost" size="icon">
                      <FilePenIcon className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500"
                      onClick={() => handleDirectDeleteUser(user.id)}
                    >
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
          })}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between mt-4">
        <Button onClick={handleDeleteUser} variant="destructive">
          Delete Selected
        </Button>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon">
            <ChevronLeftIcon className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon">
            <ChevronLeftIcon className="w-4 h-4" />
          </Button>
          {paginationButton?.map((item, index) => (
            <Button
              key={item}
              variant={item === page ? 'primary' : 'outline'}
              size="icon"
              onClick={() => handleLimit(item - 1)}
            >
              {item}
            </Button>
          ))}
          <Button variant="outline" size="icon">
            <ChevronRightIcon className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon">
            <ChevronRightIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function ChevronLeftIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function FilePenIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  );
}

function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
