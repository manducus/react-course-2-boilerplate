import authReducer from '../../reducers/auth'

test('should set uid for login', () => {
  const uid = "userId"
  const action = { type: "LOGIN", uid }
  const state = authReducer({}, action)
  expect(state).toEqual({ uid });
});

test('should set uid for logout', () => {
  const action = { type: "LOGOUT" }
  const state = authReducer({ uid: "someId" }, action)
  expect(state).toEqual({});
});