const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const SERVER_ERROR = 500;
const OK_STATUS = 200;
const CREATED_STATUS = 201;

const validationMessage = {
  maxlength: 'Максимальная длина - 30 символов',
  minlength: 'Минимальная длина - 2 символа',
  requared: 'Поле должно быть заполнено',
  unvalidUrl: 'Введите URL',
  email: 'Формат email: ivanivanov@example.com',
};

module.exports = {
  BAD_REQUEST,
  NOT_FOUND,
  SERVER_ERROR,
  OK_STATUS,
  CREATED_STATUS,
  validationMessage,
};
