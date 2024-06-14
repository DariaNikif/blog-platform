import React from 'react';
import { Pagination } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage } from '../../Redux/slice/pageSlice';
import './BasicPagination.scss';

export default function BasicPagination({ total }) {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.page.currentPage);

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <Pagination
      defaultCurrent={1}
      current={currentPage}
      total={total}
      pageSize={5}
      onChange={handlePageChange}
      style={{ textAlign: 'center', marginTop: '20px' }}
    />
  );
}
