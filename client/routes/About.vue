<template>
  <max-width-wrapper class="about">
    <h2>What</h2>
    <p>Uncover is a new-release aggregator that helps you discover when your favourite authors release new books. The goal is to provide a single page that you can bookmark, and check whenever you want to find a new book.</p>

    <p>The feature-set is incredibly simple: a single page that shows you the newest books published by authors you choose. I do have features I plan on adding, but the core concept will remain the same: a simple, quick way to find new stuff you'll like.</p>

    <h2>Who</h2>
    <p>Uncover is a 1-man side-project created by me, <a href="https://github.com/joshwcomeau">Joshua Comeau</a>.</p>

    <h2>Why</h2>
    <p>This is very much a passion project for me. It's a very niche solution to a specific problem I've had, as both an avid audiobook fan <em>and</em> a person with a horrible memory. I have no idea if it's a useful tool for anyone else, but I hope it is!</p>

    <h2>How</h2>
    <p>When you add authors to track, that data is kept locally on your device. We do not have any sort of accounts system, nor do we store your data on any external servers. Your data sits on your computer or phone. When you load the main page, your browser sends that information to our server, and it uses it to check for the latest releases.</p>

    <p>The server delegates the hard work to two third-party APIs: <a href="https://www.goodreads.com/api" target="_blank">Goodreads</a>, and <a href="http://docs.aws.amazon.com/AWSECommerceService/latest/DG/Welcome.html" target="_blank">Amazon Product Advertising</a>. The server parses and filters that information, and then passes it along to the client.</p>

    <p>Note that <strong>I do earn a commission from Amazon</strong> if you click any of the books suggested to you by Uncover. I am not looking to turn this into a viable business, but it'd be nice if it covered my server costs. Interestingly, Amazon actually <strong>requires</strong> that you make a sale every few months in order to use its API. In other words, if I didn't have these affiliate links, this service wouldn't exist.</p>
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
