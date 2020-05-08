import dayjs from 'dayjs'
import 'dayjs/locale/ja';
export default {
    changeDateFormat: function (date) {
        dayjs.locale('ja');
        return dayjs(date).format("YYYY/MM/DD HH:mm");
    }
}