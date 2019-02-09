<template>
    <div class="content">
        <div class="loading" v-if="loading">
            Loading...
        </div>
        <div class="panel" v-if="!loading">
            <div class="topic_header">
                <span class="tab" v-if="data.tab_name">{{ data.tab_name }}</span>
                <span class="title">{{ data.title }}</span>
                <ul class="changes">
                    <li>发布于{{data.create_at | time}}</li>
                    <li>作者{{ data.author.loginname }}</li>
                    <li>{{ data.visit_count }}次浏览</li>
                    <li>最后一次编辑是{{data.last_reply_at | time}}</li>
                    <li>来自 {{data.tab | tabName}}</li>
                </ul>
            </div>
            <div class="topic" v-html="data.content"></div>
        </div>
        <div class="panel" v-if="!loading">
            <div class="replies">
                <div class="replies_header">{{data.replies_length}} 回复</div>
                <div class="cell" v-for="(reply, index) in data.replies" :key="reply.id">
                    <div class="author_content">
                        <img :src="reply.author.avatar_url" :alt="reply.author.loginname">
                        <span class="reply_author_loginname">{{reply.author.loginname}}</span>
                        <span>{{index+1}}楼</span>
                        <span class="middle_dot">&middot;</span>
                        <span>{{reply.create_at | time}}</span>
                    </div>
                    <p class="markdown-text" v-html="reply.content"></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    /*eslint no-console: ["error", { allow: ["warn", "error"] }] */

    import axios from 'axios';


    export default {
        name: "Details",
        data: function () {
            return {
                authorData: '',
                data: '',
                errored: false,
                loading: true
            }
        },
        filters: {
            tabName: function (value) {
                if (value === 'share') {
                    return '分享';
                } else if (value === 'ask') {
                    return '问答';
                }
            },
        },
        mounted: function () {
            axios.get('https://cnodejs.org/api/v1/topic/' + this.$route.params.id) // ${this.params.id}是es6语法，获取当前组件的路由信息
                .then(response => {
                    this.data = response.data.data;
                    this.setTab();
                    this.setRepliesLength();
                    this.getAuthorData();
                })
                .catch(error => {
                    console.error(error);
                    this.errored = true
                })
                .finally(() => this.loading = false);
        },
        methods: {
            setTab: function () {
                let _this = this;
                let data = this.data;
                if (data.top) {
                    _this.$set(data, 'tab_name', '置顶');
                } else if (data.good) {
                    _this.$set(data, 'tab_name', '精华');
                }
            },
            setRepliesLength: function () {
                let length = this.data.replies.length;
                this.$set(this.data, 'replies_length', length);
            },
            getAuthorData: function () {
                axios
                    .get('https://cnodejs.org/api/v1/user/' + this.data.author.loginname)
                    .then(response => {
                        this.authorData = response.data.data;
                    })
                    .catch(error => {
                        console.error(error);
                        this.errored = true
                    })
            }
        }
    }
</script>

<style scoped>
    .panel {
        margin-bottom: 20px;
        border-radius: 3px;
        font-size: 15px;
        background-color: #fff;
    }

    .panel >>> a {
        color: #08c;
        text-decoration: none;
    }

    .panel >>> a:hover {
        text-decoration: underline;
    }

    .topic_header {
        margin: 10px 0;
        padding: 10px 10px 0 10px;
    }

    .tab {
        margin-right: 10px;
        padding: 2px 4px;
        border-radius: 3px;
        font-size: 12px;
        color: #fff;
        background-color: #80bd01;
    }

    .title {
        padding: 10px 0;
        font-size: 22px;
        font-weight: 700;
    }

    .changes {
        margin: 10px 0;
        padding: 0;
        display: flex;
    }

    .changes li {
        margin: 0 15px;
        padding: 0;
        font-size: 12px;
        color: #838383;
    }

    .topic {
        padding: 0 20px 10px 20px;
        border-top: 1px solid #e5e5e5;
    }

    .topic >>> img {
        width: 100%;
    }

    .replies_header {
        padding: 10px;
        border-radius: 3px 3px 0 0;
        background-color: #f6f6f6;
    }

    .cell {
        padding: 10px;
        border-top: 1px solid #f0f0f0;
    }

    .author_content img {
        width: 30px;
        height: 30px;
        border-radius: 3px;
    }

    .author_content {
        height: 30px;
        font-size: 11px;
        color: #08c;
    }

    .reply_author_loginname {
        padding: 0 10px;
        font-size: 12px;
        font-weight: 700;
        color: #666;
    }

    .middle_dot {
        font-weight: 900;
        font-size: 18px;
    }

    .markdown-text >>> img {
        width: 100px;
    }
</style>
