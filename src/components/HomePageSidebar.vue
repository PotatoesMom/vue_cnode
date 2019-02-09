<template>
    <div class="sidebar">
        <div class="panel">
            <div class="header">友情社区</div>
            <div class="inner">
                <ol>
                    <li>
                        <a href="https://ruby-china.org/" target="_blank">
                            <img src="//static2.cnodejs.org/public/images/ruby-china-20150529.png">
                        </a>
                    </li>
                    <li>
                        <a href="http://golangtc.com/" target="_blank">
                            <img src="//static2.cnodejs.org/public/images/golangtc-logo.png">
                        </a>
                    </li>
                    <li>
                        <a href="http://phphub.org/" target="_blank">
                            <img src="//static2.cnodejs.org/public/images/phphub-logo.png">
                        </a>
                    </li>
                    <li>
                        <a href="https://testerhome.com/" target="_blank">
                            <img src="//static.cnodejs.org/FjLUc7IJ2--DqS706etPQ1EGajxK">
                        </a>
                    </li>
                </ol>
            </div>
        </div>
        <div class="panel">
            <div class="header">客户端二维码</div>
            <div class="inner">
                <img style="width: 200px" src="//static.cnodejs.org/FtG0YVgQ6iginiLpf9W4_ShjiLfU">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "HomePageSidebar"
    }
</script>

<style scoped>

    .panel {
        margin-bottom: 20px;
    }

    .header {
        padding: 10px;
        border-radius: 3px 3px 0 0;
        color: #51585c;
        background-color: #f6f6f6;
    }

    .inner {
        padding: 15px;
        border-radius: 0 0 3px 3px;
        text-align: center;
        background-color: #fff;
    }

    ol {
        padding: 0;
        margin: 0;
        list-style: none;
        text-align: left;
    }

    li {
        padding: 5px 0;
    }

    img {
        width: 150px;
    }
</style>
