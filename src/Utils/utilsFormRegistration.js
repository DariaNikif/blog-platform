import { message } from 'antd';

export default function utilsCheckForRegistration(error) {
  const res = JSON.parse(error.response.request.response);
  if ('username' in res.errors && 'email' in res.errors) {
    message.error('Указанный адрес электронной почты и псевдоним уже зарегистрированы.');
  } else if ('username' in res.errors) {
    message.error('Указанное имя пользователя уже существует.');
  } else if ('email' in res.errors) {
    message.error('Указанный адрес электронной почты уже зарегистрирован.');
  } else {
    message.error('Повторите попытку или проверьте данные.');
  }
}
