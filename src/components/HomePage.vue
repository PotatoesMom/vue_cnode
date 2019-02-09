<template>
    <div class="content">
        <div class="loading" v-if="loading">
            Loading...
        </div>
        <div class="panel" v-if="!loading">
            <div class="header">
                <span class="all">全部</span>
            </div>
            <div class="topic_list">
                <div class="cell" v-for="cell in cells" :key="cell.id">
                    <div class="left">
                        <router-link :to="{name: 'user', params: {loginname: cell.author.loginname}}" class="user_avatar">
                            <img :src="cell.author.avatar_url" :alt="cell.author.loginname">
                        </router-link>
                        <div class="reply_count">
                            <span class="count_of_replies" title="回复数"> {{ cell.reply_count }}</span>
                            <span class="count_seperator">/</span>
                            <span class="count_of_visits" title="点击数">{{ cell.visit_count }}</span>
                        </div>
                        <div class="tab" :class="{'top': cell.top, 'good': cell.good}">{{ cell.tab_name }}</div>
                        <div class="title">
                            <router-link :to="{name: 'detail', params: {id: cell.id}}" class="title">{{ cell.title | titleLength }}</router-link>
                        </div>
                    </div>
                    <div class="right">
                        <div class="last_active_time"> {{ cell.last_reply_at | time }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    /*eslint no-console: ["error", { allow: ["warn", "error"] }] */

    import axios from 'axios';


    export default {
        name: "HomePage",
        data: function () {
            return {
                cells: null,
                errored: false,
                loading: true
            }
        },
        mounted: function () {
            axios.get('https://cnodejs.org/api/v1/topics')
                .then(response => {
                    this.cells = response.data.data;
                    this.setTab();
                })
                .catch(error => {
                    console.error(error);
                    this.errored = true
                })
                .finally(() => this.loading = false);

        },
        filters: {
            titleLength: function (value) {
                let strLength = 0;
                let len = 50; //需要截取的长度
                let str_cut = '';
                for (let i = 0; i < value.length; i++) {
                    let a = value.charAt(i);
                    strLength++;
                    if (escape(a).length > 4) {
                        //中文字符的长度经编码之后大于4
                        strLength++;
                    }
                    str_cut = str_cut.concat(a);
                    if (strLength >= len) {
                        str_cut = str_cut.concat("...");
                        return str_cut;
                    }
                }
                //如果给定字符串小于指定长度，则返回源字符串；
                if (strLength < len) {
                    return value;
                }
            }
        },
        methods: {
            setTab: function () {
                let _this = this;
                for (let i = 0; i < _this.cells.length; i++) {
                    let cell = _this.cells[i];
                    if (cell.top) {
                        _this.$set(cell, 'tab_name', '置顶');
                    } else if (cell.good) {
                        _this.$set(cell, 'tab_name', '精华');
                    } else if (cell.tab === 'share') {
                        _this.$set(cell, 'tab_name', '分享');
                    } else if (cell.tab === 'ask') {
                        _this.$set(cell, 'tab_name', '问答');
                    }
                }
            }
        }
    }
</script>

<style scoped>

    .header {
        border-radius: 3px 3px 0 0;
        background-color: #f6f6f6;
        padding: 10px 10px 10px 20px;
    }

    .all {
        padding: 3px;
        border-radius: 3px;
        color: white;
        background-color: #80bd01;
    }

    .cell {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        border: 1px solid #f0f0f0;
        background-color: #fff;
    }

    .cell:hover {
        background-color: #f0f0f0;
    }

    .cell:nth-child(1) {
        border-top: none;
    }

    .left {
        display: flex;
        align-items: center;
    }

    a.user_avatar {
        height: 30px;
    }

    img {
        width: 30px;
        height: 30px;
        border-radius: 3px;
    }

    .reply_count {
        width: 90px;
        height: 100%;
        padding: 0 10px;
    }

    .count_of_replies {
        color: #9e78c0
    }

    .count_of_visits {
        font-size: 10px;
        color: #b4b4b4;
    }

    .tab {
        padding: 1px 4px;
        border-radius: 3px;
        font-size: 12px;
        color: #999;
        background-color: #e5e5e5;
    }

    .top,
    .good {
        color: #fff;
        background-color: #80bd01;
    }

    a.title {
        padding-left: 20px;
        text-decoration: none;
        font-size: 16px;
        color: #333;
    }

    a.title:hover {
        text-decoration: underline;
    }

    a.title:visited {
        color: #888;
    }

    .last_active_time {
        font-size: 11px;
        color: #778087;
    }
</style>
