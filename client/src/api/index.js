import users from './modules/users.js'
import seats from './modules/seats.js'
import seat_user from './modules/seats.js'
import history from './modules/history.js'
export default {
  ...users,
  ...seats,
  ...seat_user,
  ...history
}
