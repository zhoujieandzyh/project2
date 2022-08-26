<template>
  <div>
    <div class="box1">
        <span>{{title}}</span>
        <svg t="1659067144554" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2396" width="16" height="16"><path d="M512 65.984C266.048 65.984 65.984 266.048 65.984 512S266.048 958.016 512 958.016 958.016 757.952 958.016 512 757.952 65.984 512 65.984zM544 736c0 17.696-14.304 32-32 32s-32-14.304-32-32l0-288c0-17.696 14.304-32 32-32s32 14.304 32 32L544 736zM512 352c-26.496 0-48-21.536-48-48C464 277.472 485.504 256 512 256s48 21.472 48 48C560 330.464 538.496 352 512 352z" p-id="2397"></path></svg>
    </div>
    <div class="box2">{{count}}</div>
    <div class="box3">
        <slot name="A"></slot>
    </div>
    <div class="box4">
        <slot name="B"></slot>
    </div>
  </div>
</template>

<script>
export default {
        props:['title','count']
}
</script>

<style>
    .box1{
        display: flex;
        justify-content: space-between;
        color:#eee;
    }
    .box2{
        font-size: 20px;
        padding: 10px 0;
    }
    .box3{
        height: 50px;
    }
    .box4{
        border-top: 1px solid #eee;
        padding-top: 5px;
    }
</style>