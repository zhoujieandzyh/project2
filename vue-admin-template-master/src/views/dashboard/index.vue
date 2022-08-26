<template>
<div>
      <Card></Card>
      <Sale></Sale>
      <Obvers ></Obvers>
</div> 
</template>

<script>
import Card from './Card'
import Sale from './Sale'
import Obvers from './Obvers'
export default {
        name:'dashboard',
        components:{Card,Sale,Obvers},
}
</script>

<style>

</style>
