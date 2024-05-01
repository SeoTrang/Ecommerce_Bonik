<template>
  <div>
    <QuillEditor
    ref="quill"
    :modules="modules"
    toolbar="full"
    v-model="quillValue"
    
    id="quillEditor"
    @textChange="textChange"
  />
  <!-- <button @click="submit">Submit</button> -->
  </div>
</template>
<script setup>
import { ref, defineComponent, onMounted, toRefs, watch } from 'vue';
import { QuillEditor } from '@vueup/vue-quill';
import BlotFormatter from 'quill-blot-formatter';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const props = defineProps({
  handleGetContent1: Function,
  contentArticle: String
});

const modules = {
  name: 'blotFormatter',
  module: BlotFormatter,
  options: {}
};

const quillValue = ref('');
const test = ref('');
const quillRef = ref(null);
const quill = ref(null);

watch(()=> props.contentArticle,(newVal,oldVal)=>{
    // console.log(newVal);
    quillValue.value = newVal;
    quill.value.setHTML(newVal);
})

watch(quillValue,(newVal,oldVal)=>{
  console.log(newVal);
})



const submit = () => {
  let content = document.querySelector('#quillEditor .ql-editor').innerHTML;
  console.log(content);
  console.log(props.contentArticle);
  props.handleGetContent1(content);
};

const textChange = () => {
  let content = document.querySelector('#quillEditor .ql-editor').innerHTML;
  props.handleGetContent1(content);
};

const handleBlur = () => {
  // Do something on blur event
};

const editorChange = (content, delta, source, editor) => {
  console.log('Editor content changed:', content);
};

onMounted(() => {
  const imageButton = document.querySelector('.ql-image');
  imageButton.disabled = true;
  if (imageButton) {
    imageButton.addEventListener('click', (e) => {
      console.log('Insert image button clicked');
      // Handle click event for inserting image
    });
  }
});

</script>

<style>
.ql-container {
  min-height: 200px;
}
</style>
