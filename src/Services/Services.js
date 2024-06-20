import axios from 'axios';
import utilsCheckForRegistration from '../Utils/utilsFormRegistration';

const API_URL = 'https://blog.kata.academy/api';

// Функция для получения всех статей с пагинацией
export const getArticles = async (page = 1, pageSize = 10) => {
  try {
    const response = await axios.get(`${API_URL}/articles`, {
      params: {
        limit: pageSize,
        offset: (page - 1) * pageSize,
      },
    });

    return {
      articles: response.data.articles,
      total: response.data.articlesCount,
    };
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};

// Функция для регистрации пользователя
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users`, { user: userData });
    return response.data.user;
  } catch (error) {
    utilsCheckForRegistration(error);
    console.error('Ошибка при регистрации пользователя:', error);
    throw error;
  }
};

// Функция для входа пользователя
export const loginUser = async (user) => {
  try {
    const res = await axios.post(`${API_URL}/users/login`, { user });
    localStorage.setItem('token', res.data.user.token);
    localStorage.setItem('username', res.data.user.username);
    localStorage.setItem('email', res.data.user.email);
    localStorage.setItem('image', res.data.user.image);
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Функция для обновления профиля
export const updateProfile = async (data) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(
      `${API_URL}/user`,
      { user: { ...data } },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      },
    );
    localStorage.setItem('username', response.data.user.username);
    localStorage.setItem('email', response.data.user.email);
    localStorage.setItem('image', response.data.user.image);
    return response.data.user;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

// Функция для запроса на создание статьи
export const createArticle = async (data) => {
  const token = localStorage.getItem('token');
  const { title, description, text, tags } = data;
  const validTags = tags.filter((tag) => tag.value.trim() !== '');
  const validData = {
    article: {
      title,
      description,
      body: text,
      tagList: validTags.map((tag) => tag.value),
    },
  };
  try {
    const res = await axios.post(`${API_URL}/articles`, validData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    });
    return res.data.article;
  } catch (error) {
    console.error('Error creating article:', error);
    throw new Error('Failed to create article');
  }
};

// Функция для запроса на получения полного поста
export const getFullArticle = async (token, slug) => {
  try {
    const response = await axios.get(`${API_URL}/articles/${slug}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching article:', error);
    throw new Error('Failed to fetch article');
  }
};

// Функция удаления статьи
export const deleteArticle = async (slug, token) => {
  try {
    const res = await axios.delete(`${API_URL}/articles/${slug}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    });
    return res;
  } catch (error) {
    console.error('Error deleting article:', error);
    throw new Error('Failed to delete article');
  }
};

// Функция редактирования статьи
export const updateArticle = async (title, description, body, tagList, token, slug) => {
  const validData = {
    article: {
      title,
      description,
      body,
      tagList: tagList.map((tag) => tag.value),
    },
  };

  try {
    const res = await axios.put(`${API_URL}/articles/${slug}`, validData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    });
    return res.data.article;
  } catch (error) {
    console.error('Error updating article:', error);
    throw new Error('Failed to update article');
  }
};

// Функция для запроса на добавления лайка
export const Liked = async (token, slug) => {
  try {
    const res = await axios.request({
      url: `https://blog.kata.academy/api/articles/${slug}/favorite`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    });
    return res;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to add article to favorites');
  }
};

// Функция для запроса на удаления лайка
export const disLiked = async (token, slug) => {
  try {
    const res = await axios.request({
      url: `https://blog.kata.academy/api/articles/${slug}/favorite`,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    });
    return res;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to remove article from favorites');
  }
};
