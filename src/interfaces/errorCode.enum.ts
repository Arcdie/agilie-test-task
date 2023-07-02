export enum EErrorCode {
  INVALID_SPECIALITY = 'Передана невалідна спеціальність лікаря',
  EXIST_USER_WITH_PHONE = 'Користувач з таким номером телефону вже зареєстрований',

  NO_USER_IN_DB = 'Користувач не знайдений',
  NO_DOCTOR_IN_DB = 'Доктор не знайдений',

  APPOINTMENT_INTERSECTS_WITH_EXISTED = 'Немає вільних слотів на даний час',
  DOCTOR_CANNOT_HAVE_APPOINTMENT_AT_THIS_TIME = 'Доктор не приймає у цей день або години',
};
