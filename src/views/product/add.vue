<template>
    <ProductForm v-model="formData" @submit="createProduct" />
</template>

<script setup>
import ProductForm from '../../components/ProductForm.vue'
import axios from 'axios'
import { showAlert } from '../../utils/alert'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const formData = ref({
    Title: '',
    C_OR_R: '',
    Price: '',
    Category: '',
    Description: '',
    Image: null,
})

// چون API مولتی‌پارت رو ساپورت نمی‌کنه و خطای 405 می‌ده، داده‌ها به صورت JSON ارسال شدن نه multipart.
const createProduct = () => {
    const allFieldsFilled = Object.entries(formData.value)
        .filter(([key]) => key !== 'image')
        .every(([_, value]) => value !== '')

    if (!allFieldsFilled) {
        showAlert('لطفا همه فیلدها را پر کنید')
        return
    }

    axios.post('https://ahuan.ir/api/foods', formData.value, {
        headers: { 'Content-Type': 'application/json' }
    })
    .then(() => {
        showAlert('محصول با موفقیت ایجاد شد')
        setTimeout(() => {
            router.back()
        }, 500)
    })
    .catch(error => {
        showAlert(error?.response?.data?.info?.[0]?.message?.fa)
    })
}
</script>