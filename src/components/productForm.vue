```vue
<template>
    <div dir="rtl" class="flex justify-center h-screen items-center bg-gradient-to-r from-blue-500 to-teal-400">
        <form @submit.prevent="handleSubmit" class="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 space-y-6">
            <div>
                <h2 class="text-xl text-center font-semibold text-blue-700">فرم {{ route.name == 'createProduct' ? 'ثبت' : 'ویرایش' }} محصول</h2>
            </div>

            <div>
                <input v-model="internalForm.Title" type="text" placeholder="نام" class="custom-input" />
            </div>

            <div>
                <input v-model="internalForm.C_OR_R" type="text" placeholder="C_OR_R" class="custom-input" />
            </div>

            <div>
                <input v-model="internalForm.Price" type="number" placeholder="قیمت" class="custom-input" />
            </div>

            <div>
                <input v-model="internalForm.Category" type="text" placeholder="دسته بندی" class="custom-input" />
            </div>

            <div>
                <textarea v-model="internalForm.Description" rows="3" placeholder="توضیحات" class="custom-input"></textarea>
            </div>

            <div>
                <input @change="handleImageUpload" type="file" accept="image/*" class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
            </div>

            <div>
                <button type="submit" class="w-full py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
                    ذخیره
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const props = defineProps({
    modelValue: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['update:modelValue', 'submit'])

const internalForm = ref({ ...props.modelValue })

watch(
    () => props.modelValue,
    (newVal) => {
        internalForm.value = { ...newVal }
    },
    { deep: true, immediate: true }
)

watch(
    () => internalForm.value,
    (newVal) => {
        emit('update:modelValue', { ...newVal })
    },
    { deep: true }
)

const handleImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
        internalForm.value.Image = file
    }
}

const handleSubmit = () => {
    emit('submit')
}
</script>

<style>
.custom-input {
    width: 100%;
    border-radius: 0.5rem;
    border: 1px solid #e5e7eb;
    padding: 5px;
}

.custom-input::placeholder {
    font-size: smaller;
}

.custom-input:focus {
    outline: none;
}

form {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

button:focus {
    outline: none;
}
</style>