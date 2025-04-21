<template>
    <ProductForm v-model="formData" @submit="updateProduct" />
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
    import { showAlert } from '../../utils/alert'
  import axios from 'axios'
  import ProductForm from '../../components/ProductForm.vue'
  import { useRouter } from 'vue-router'
    const router = useRouter()
  const route = useRoute()
  const productId = Number(route.params.id)
  
  const formData = ref({
    Id: '',
    Title: '',
    Description: '',
    Price: 0,
    Category: '',
    Image: null,
    C_OR_R: ''
  })
  
  const loadProduct = (id) => {
    axios.get(`https://ahuan.ir/api/foods/${id}`)
      .then(response => {
        formData.value = response.data
      })
      .catch(err => {
        showAlert('خطا در بارگذاری محصول. لطفاً دوباره تلاش کنید.')
      })
  }
  
  const updateProduct = () => {
    const allFieldsFilled = Object.entries(formData.value)
        .filter(([key]) => key !== 'image')
        .every(([_, value]) => value !== '')

    if (!allFieldsFilled) {
        showAlert('لطفا همه فیلدها را پر کنید')
        return
    }
    axios.put(`https://ahuan.ir/api/foods/${productId}`, formData.value)
      .then(response => {
        showAlert('محصول با موفقیت به‌روزرسانی شد!')
        setTimeout(() => {
            router.back()
        }, 500)
      })
      .catch(err => {
        showAlert('خطا در به‌روزرسانی محصول. لطفاً دوباره تلاش کنید.')
      })
  }
  
  onMounted(() => {
    loadProduct(productId)
  })
  </script>
  