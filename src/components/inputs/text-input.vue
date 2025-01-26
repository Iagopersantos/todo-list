<script>
export default {
  name: "TextInput",
  props: {
    placeholder: {
      type: String,
      default: "",
    },
  },
};
</script>

<template>
  <div class="input-container">
    <input type="text" :placeholder="placeholder" />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-search"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  </div>
</template>

<style scoped>
.input-container {
  position: relative;
  display: flex;
  align-items: center;
}

input {
  width: 14rem;
  height: 40px;
  padding: 8px 8px 8px 32px;
  margin: 4px 4px;
  box-sizing: border-box;
  border: 1px solid #bdb8b8;
  border-radius: 26px;
}

input:focus {
  outline: none;
  border: 1px solid #333;
}

svg.lucide-search {
  position: absolute;
  left: 10px; /* Position the SVG inside the input */
  pointer-events: none; /* Make sure the SVG does not block input interactions */
}
</style>
