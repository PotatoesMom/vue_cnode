<template>
    <div class="sidebar">
        <div class="loading" v-if="loading">
            Loading...
        </div>
        <div class="panel" v-if="!loading">
            <div class="header">
                <span class="col_fade">作者</span>
            </div>
            <div class="inner">
                <div class="user_card">
                    <router-link :to="{name: 'user', params: {loginname: authorData.loginname}}" class="user_avatar">
                        <img :src="authorData.avatar_url" :alt="authorData.loginname" :title="authorData.loginname">
                        <span class="user_name">{{ authorData.loginname }}</span>
                    </router-link>
                </div>
                <div class="integral">积分：{{authorData.score}}</div>
            </div>
        </div>
        <div class="panel" v-if="!loading">
            <div class="header">
                <span class="col_fade">作者其它话题</span>
            </div>
            <div class="inner">
                <ul class="unstyled">
                    <li v-for="recent_topic in authorData.recent_topics.slice(0, 5)" :key="recent_topic.id">
                        <router-link :to="{name: 'detail', params: {id: recent_topic.id}}">{{recent_topic.title}}</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>

    /*eslint no-console: ["error", { allow: ["warn", "error"] }] */

    import Details from './Details'

    export default {
        name: "DetailsSidebar",
        data: function () {
            return {
            }
        },
        mixins: [Details],
    }
</script>

<style scoped>
    .panel {
        margin: 10px 0 20px 0;
    }
    .header {
        padding: 10px;
        border-radius: 3px 3px 0 0;
        color: #51585c;
        background-color: #f6f6f6;
    }

    .inner {
        padding: 10px;
        border-radius: 0 0 3px 3px;
        background-color: #fff;
    }

    img {
        width: 48px;
        height: 48px;
        border-radius: 3px;
    }

    a {
        text-decoration: none;
    }

    .user_avatar {
        font-size: 16px;
        color: #778087;
    }

    .user_name {
        padding-left: 20px;
    }

    .integral {
        margin: 10px 0;
    }

    .unstyled {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .unstyled li {
        padding: 5px 0;
    }

    .unstyled li a{
        color: #778087;
    }
</style>
