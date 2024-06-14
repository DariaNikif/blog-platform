import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BasicPagination from '../BasicPagination/BasicPagination';
import Article from '../Article/Article';
import Loader from '../Loader/Loader';
import { getArticles, getFullArticle } from '../../Services/Services';
import { setCurrentPage } from '../../Redux/slice/pageSlice';

export default function ArticleList() {
  const dispatch = useDispatch();
  const { currentPage, pageSize } = useSelector((state) => state.page);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalArticles, setTotalArticles] = useState(0);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { articles: articlesData, total } = await getArticles(currentPage, pageSize);
        const articlesWithLikes = await Promise.all(
          articlesData.map(async (article) => {
            const fullArticle = await getFullArticle(localStorage.getItem('token'), article.slug);
            return { ...article, ...fullArticle.article };
          }),
        );
        setArticles(articlesWithLikes);
        setTotalArticles(total);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      }
    };

    fetchArticles();
  }, [currentPage, pageSize]);

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {articles.map((article, index) => (
            <Article key={index} {...article} />
          ))}
          <BasicPagination
            defaultCurrent={currentPage}
            total={totalArticles}
            onChange={handlePageChange}
          />
        </>
      )}
    </>
  );
}
