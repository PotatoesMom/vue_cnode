<template>
    <div class="content">
        <div class="loading" v-if="loading">
            Loading...
        </div>
        <div class="panel" v-if="!loading">
            <div class="header">
                <router-link :to="{path: '/'}">主页/</router-link>
            </div>
            <div class="inner">
                <img :src="authorData.avatar_url" :alt="authorData.loginname" :title="authorData.loginname">
                <span class="loginname">{{authorData.loginname}}</span>
                <div class="integral">积分：{{authorData.score}}</div>
                <div class="github">
                    <i class="fab fa-github"></i>
                    <a :href="'https://github.com/' + authorData.githubUsername" target="_blank">@{{authorData.loginname}}</a>
                </div>
                <div class="col_fade">注册时间 {{authorData.create_at | time}}</div>
            </div>
        </div>
        <div class="panel" v-if="!loading">
            <div class="header">最近创建的话题</div>
            <div class="cell" v-for="recent_topic in authorData.recent_topics" :key="recent_topic.id">
                <div class="left">
                    <img :src="recent_topic.author.avatar_url" :alt="recent_topic.author.loginname">
                    <div class="title">
                        <router-link :to="{name: 'detail', params: {id: recent_topic.id}}">
                            {{recent_topic.title}}
                        </router-link>
                    </div>
                </div>
                <div class="right">{{recent_topic.last_reply_at | time}}</div>
            </div>
        </div>
        <div class="panel" v-if="!loading">
            <div class="header">最近参与的话题</div>
            <div class="cell" v-for="recent_reply in authorData.recent_replies" :key="recent_reply.id">
                <div class="left">
                    <img :src="recent_reply.author.avatar_url" :alt="recent_reply.author.loginname">
                    <div class="title">
                        <router-link :to="{name: 'detail', params: {id: recent_reply.id}}">
                            {{recent_reply.title}}
                        </router-link>
                    </div>
                </div>
                <div class="right">{{recent_reply.last_reply_at | time}}</div>
            </div>
        </div>
    </div>
</template>

<script>

    /*eslint no-console: ["error", { allow: ["warn", "error"] }] */

    import axios from 'axios';

    export default {
        name: "User",
        data: function () {
            return {
                authorData: '',
                errored: '',
                loading: true
            }
        },
        filters: {
            time: function (value) {
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
            },
        },
        mounted: function () {
            axios.get('https://cnodejs.org/api/v1/user/' + this.$route.params.loginname) // ${this.params.id}是es6语法，获取当前组件的路由信息
                .then(response => {
                    this.authorData = response.data.data;
                })
                .catch(error => {
                    console.error(error);
                    this.errored = true
                })
                .finally(() => this.loading = false);
        }
    }
</script>

<style scoped>
    .panel {
        margin-bottom: 20px;
    }

    a {
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }

    .header {
        padding: 10px;
        border-radius: 3px 3px 0 0;
        background-color: #f6f6f6;
    }

    .header a {
        color: #80bd01;
    }

    .inner {
        padding: 10px;
        background-color: #fff;
        border-radius: 0 0 3px 3px;
    }

    .inner div {
        margin: 10px 0;
    }

    .inner img{
        width: 40px;
        height: 40px;
        border-radius: 3px;
    }

    .loginname {
        padding-left: 10px;
        color: #778087;
    }

    .github {
        font-size: 14px;
        color: #778087
    }

    .github i {
        padding: 0 10px;
    }

    .github a {
        color: #778087;
    }

    .col_fade {
        color: #ababab;
    }

    .cell {
        display: flex;
        justify-content: space-between;
        border-top: 1px solid #f0f0f0;
        background-color: #fff;
    }

    .left {
        display: flex;
        margin: 10px;
    }

    .right {
        padding: 15px;
        font-size: 11px;
        color: #777;
    }

    .title {
        margin-left: 20px;
        padding-top: 5px;
    }

    .cell img {
        width: 30px;
        height: 30px;
        border-radius: 3px;
    }

    .cell a {
        font-size: 16px;
        color: #08c;
    }

</style>
