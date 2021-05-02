import users from './modules/users.js'
import seats from './modules/seats.js'
import seat_user from './modules/seats.js'
import history from './modules/history.js'
import reputation from './modules/reputation.js'
export default {
  ...users,
  ...seats,
  ...seat_user,
  ...history,
  ...reputation
}
