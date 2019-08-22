<template>
    <div class="statement">
        <nav class="overIew-nav">
            <layout-breadcrumb></layout-breadcrumb>
        </nav>
        <h3>监控报表</h3>
        <div class="statement_content">

        </div>
    </div>
</template>

<script>
    export default {
        name: "statement"
    }
</script>

<style lang="scss" scoped>
.statement{
    font-size: .16rem;
    .statement_content{
        background:rgba(255,255,255,1);
        box-shadow:0 2px 4px 1px rgba(0,0,0,0.1);
        border-radius:10px;
        padding: 30px;
        box-sizing: border-box;


    }
}
</style>