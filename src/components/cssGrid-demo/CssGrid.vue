<template>
  <div>
    <section id="page">
      <header>Header</header>
      <nav>Navigation</nav>
      <main>Main area</main>
      <aside>Aside</aside>
      <footer>Footer</footer>
    </section>
  </div>
</template>

<style lang="scss" scoped>
#page {
  display: grid;
  width: 100%;
  height: 100vh;
  text-align: center;
  grid-template: [header-left] "head head head" 60px [header-right]
                 [main-left]   "nav  main aside" 1fr  [main-right]
                 [footer-left] "nav  foot foot" 60px [footer-right] / 200px 1fr 150px;
  header {
    background-color: orange;
    grid-area: head;
  }
  nav {
    background-color: lightblue;
    grid-area: nav;
  }
  main {
    background-color: yellow;
    grid-area: main;
  }
  aside{
    background-color: green;
    grid-area: aside;
  }
  footer {
    background-color: red;
    grid-column: foot;
  }
}

</style>

