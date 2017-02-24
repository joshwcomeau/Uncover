<template>
  <max-width-wrapper class="about">
    <h2>So, I really like audiobooks,</h2>
    <p>and over the years I've accumulated a pretty sizeable list of authors I enjoy.</p>

    <p>When I finish a book and find myself in search of my next listen, I try to remember all the authors I like, and see if they have any new books.</p>

    <p>This is an error-prone process; I've likely missed tons of books over the years! I decided to build a tool to make this process better.</p>

    <p>Uncover is an aggregator that shows you all of your favourite authors' latest releases.<strong>It's not just for audiobooks</strong> - it currently supports print and e-books as well, and I like the idea of expanding it (movie directors? TV show episodes?).</p>
  </max-width-wrapper>
</template>

<script>
export default {
  name: 'about',
};
</script>


<style scoped lang="scss">
@import '../styles/variables';

.about {
  padding-top: 2rem;
}

</style>
