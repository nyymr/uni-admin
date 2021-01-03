<template>
  <div>
    <p>{{ state.a }}</p>
    <p>{{ state.gf.b }}</p>
    <p>{{ state.gf.f.c }}</p>
    <p>{{ state.gf.f.s.d }}</p>
    <button @click="myFn">按钮</button>
  </div>
</template>

<script>
// import { reactive } from "vue";
import { ref } from "vue";
export default {
  name: "App",
  setup() {
    /* let state = reactive({
      a: "a",
      gf: {
        b: "b",
        f: {
          c: "c",
          s: {
            d: "d",
          },
        },
      },
    }); */
    let state = ref({
      a: "a",
      gf: {
        b: "b",
        f: {
          c: "c",
          s: {
            d: "d",
          },
        },
      },
    });
    function myFn() {
      //   state.a = "1";
      //   state.gf.b = "2";
      //   state.gf.f.c = "3";
      //   state.gf.g.s.d = "4";
      state.value.a = "1";
      state.value.gf.b = "2";
      state.value.gf.f.c = "3";
      state.value.gf.g.s.d = "4";
    }
    return { state, myFn };
  },
};
</script>

<style>
</style>