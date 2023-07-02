/* time set in seconds */

export default {
  minAppointmentTime: 20 * 60, // 20 minutes
  maxAppointmentTime: 2 * 60 * 60, // 2 hours

  appointmentNotificationsTime: [{
    key: '2h',
    value: 2 * 60 * 60,
  }, {
    key: '1d',
    value: 1 * 24 * 60 * 60,
  }],
};
