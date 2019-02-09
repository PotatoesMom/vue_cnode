const time=(value)=>{
    let time = parseInt(new Date() - new Date(value)) / 1000 / 60;
    if (time < 1) {
        return "几秒前";
    } else if (time < 60) {
        time = Math.floor(time);
        return time + "分钟前";
    } else {
        time /= 60;
        if (time < 24) {
            time = Math.floor(time);
            return time + "小时前";
        } else {
            time = Math.floor(time / 24);
            if (time < 30) {
                return time + "天前";
            } else {
                time = Math.floor(time / 30);
                if (time < 12) {
                    return time + "月前";
                } else {
                    time = Math.floor(time / 12);
                    return time + "年前";
                }
            }

        }
    }
};

export default {
    time
}
