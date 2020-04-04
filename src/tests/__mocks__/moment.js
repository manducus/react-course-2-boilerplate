// import moment from "moment" なんてことをすると stack trace error になる (自分を呼ぶ関数になるので)
const moment = jest.requireActual("moment")

export default (timestamp = 0) => {
    return moment(timestamp)
}