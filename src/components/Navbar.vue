<template>
    <div class="navbar">
        <div class="navbar-inner">
            <a class="brand" href="#">
                <img src="../assets/favicon.svg" alt="icon">
            </a>
            <a href="#" class="home">首页</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Navbar"
    }
</script>

<style scoped>
    .navbar {
        display: -webkit-flex; /* Safari */
        display: flex;
        justify-content: center;
        width: 100%;
        padding: 0;
        margin: 0;
        text-align: center;
        background: #444;
    }

    .navbar-inner {
        display: -webkit-flex; /* Safari */
        display: flex;
        justify-content: space-between;
        margin: 0;
        width: 90%;
    }

    .brand {
        padding: 10px 10px 10px 0;
    }

    img{
        height: 30px;
    }

    .home {
        padding: 15px;
        font-size: 15px;
        text-decoration: none;
        color: #ccc;
    }

    .home:hover,
    .home:active {
        color: white;
    }
</style>
