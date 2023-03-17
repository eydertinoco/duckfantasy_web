<template>
  <div class="userInfo">
    <img src="https://cdn-icons-png.flaticon.com/512/5556/5556468.png" alt="avatar">
    <div>
      <p class="userInfo__name">{{nome}}</p>
      <p class="userInfo__email">{{email}}</p>
      <p class="userInfo__office">{{office}}</p>
    </div>
  </div>
</template>

<script>

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "User",
  props: {
    nome: String,
    email: String,
    office: String,
  }
}
</script>

<style scoped lang="scss">

  .userInfo {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    background: #bbe6ff;
    padding: 10px 0;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    & img {
      border: 0px;
      border-radius: 150px;
      height: 100px;
      width: 100px;
    }
    &__name {
      font-size: 32px;
      font-weight: 600;
      margin: 0;
    }
    &__email {
      font-size: 16px;
      margin: 0;
    }
    &__office {
      margin: 0px;
    }
    &__editButton {
      border: 3px solid;
      border-radius: 5px;
      cursor: pointer;
      font-size: 20px;
      font-weight: 600;
      height: 40px;
      transition: 0.5s;
      width: 140px;
      &:hover {
        border: 3px solid ;
      }
    }
  }
</style>