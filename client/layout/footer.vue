<template>
    <div id="footer">
        <span>Written by {{this.author}}</span>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    data() {
        return {
            author: 'Jokcy'
        }
    },
    methods: {

    }
}
</script>

<style scoped lang="less">
#footer{
    margin-top: 40px;
    text-align: center;
    color: #bfbfbf;
    font-size: 10px;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
}

</style>

