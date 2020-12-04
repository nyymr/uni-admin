<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
body,
div,
dl,
dt,
dd,
ul,
ol,
li,
h1,
h2,
h3,
h4,
h5,
h6,
pre,
code,
form,
fieldset,
legend,
input,
button,
textarea,
p,
blockquote,
th,
td {
  margin: 0;
  padding: 0;
}


body {
  background: #f8f9fa;
}

td,
th,
caption {
  font-size: 14px;
}

a {
  color: #000;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

img {
  border: none;
  vertical-align: middle;
}

ol,
ul,
li {
  list-style: none;
}

input,
textarea,
select,
button {
  font: 14px Verdana, Helvetica, Arial, sans-serif;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

html {
  overflow-y: hidden;
}
#app {
  height: 100vh;
}
.aside {
  height: 100%;
}
.el-main {
  padding: 0px !important;
}
::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 0;
}
::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 10px;
  height: 10px;
}
::-webkit-scrollbar-thumb {
  cursor: pointer;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.25);
  transition: color 0.2s ease;
}
</style>
