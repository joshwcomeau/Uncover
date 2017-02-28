<template>
  <max-width-wrapper class="about">
    <h2>What</h2>
    <p>Uncover is a new-release aggregator that helps you discover when your favourite authors release new books. The goal is to provide a single page that you can bookmark, and check whenever you want to find a new book.</p>

    <p>The feature-set is incredibly simple: a single page that shows you the newest books published by authors you choose. I do have features I plan on adding, but the core concept will remain the same: a simple, quick way to find new stuff you'll like.</p>

    <h2>Who</h2>
    <p>Uncover is a 1-man side-project created by me, Joshua Comeau. It's the solution to a problem I've experienced in my own life, and I figured I'd share it with the world.</p>

    <h2>Why</h2>
    <p>Uncover is a 1-man side-project created by me, Joshua Comeau. It's the solution to a problem I've experienced in my own life, and I figured I'd share it with the world.</p>
    <p>I do not plan on turning it into a business. Nevertheless, <strong>I do earn a commission from Amazon</strong> if you click any of the books suggested to you by Uncover. This affiliate fee is actually necessary, as the API I use to gather information about new releases is reserved for affiliates who make the occasional sale. By making your Amazon purchases through Uncover links, you help ensure that Uncover remains sustainable.</p>
  </max-width-wrapper>
</template>

<script>
import MaxWidthWrapper from 'components/MaxWidthWrapper';

export default {
  name: 'about',

  components: { MaxWidthWrapper },
};
</script>


<style scoped lang="scss">
@import '../styles/variables';

.about {
  position: relative;
  padding-top: 2rem;
  padding-bottom: 2rem;
  font-size: 20px;
  color: $lightgray;
  background: $darkgray;
}

h2 {
  font-size: 36px;
  margin: 3rem 0 1.75rem;
  color: $green;
}

h3 {
  margin-top: 3.5rem;
  font-size: 26px;
  color: $white;
}

h4 {
  margin: 2rem 0 3rem;
  font-size: 20px;
  color: $white;
}

p {
  margin-bottom: 1.75rem;
}

a {
  color: $white;
  font-weight: 500;
}
</style>
