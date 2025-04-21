<template>
    <div dir="rtl" class="!h-screen bg-gray-100 flex flex-col">
      <header class="shadow-md py-4 px-10 flex justify-between items-center h-[10%]">
        <h1 class="text-2xl font-bold text-[#0b3183]">مدیریت محصولات</h1>
        <div class="flex items-center gap-4">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="جستجوی محصول..."
              class="pr-10 pl-4 py-2 border border-gray-300 rounded-lg"
            />
            <svg
              class="absolute right-3 top-3 w-5 h-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="100"
              height="100"
              viewBox="0 0 50 50"
            >
              <path
                d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"
              ></path>
            </svg>
          </div>
          <button
            @click="create_product"
            class="bg-blue-600 text-white cursor-pointer px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            ایجاد محصول جدید
          </button>
        </div>
      </header>
  
      <div class="flex-1 flex justify-center items-start py-6 h-[90%]">
        <div class="datatable rounded-lg shadow-lg">
          <vue3-datatable
            class="cursor-pointer w-full"
            :rows="filteredRows"
            :columns="cols"
            :totalRows="filteredRows?.length"
            :hasCheckbox="true"
            :sortable="true"
            ref="dataTable"
            sortColumn="id"
            sortDirection="desc"
            :stickyHeader="true"
            skin="whitespace-nowrap bh-table-hover bh-table-compact"
            firstArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M13 19L7 12L13 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
            lastArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M11 19L17 12L11 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M6.99976 19L12.9998 12L6.99976 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg> '
            previousArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M15 5L9 12L15 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
            nextArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M9 5L15 12L9 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
          >
            <template #menu="data">
              <div class="dropdown">
                <Popper offsetDistance="0" class="align-middle">
                  <button
                    type="button"
                    class="w-5 flex justify-center dropdown-toggle hover:bg-gray-100 rounded-full p-1 transition duration-200"
                  >
                    <svg
                      width="4"
                      height="18"
                      viewBox="0 0 4 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 14C3.10457 14 4 14.8954 4 16C4 17.1046 3.10457 18 2 18C0.89543 18 0 17.1046 0 16C0 14.8954 0.89543 14 2 14Z"
                        fill="#757575"
                      />
                      <path
                        d="M2 7C3.10457 7 4 7.89543 4 9C4 10.1046 3.10457 11 2 11C0.89543 11 0 10.1046 0 9C0 7.89543 0.89543 7 2 7Z"
                        fill="#757575"
                      />
                      <path
                        d="M2 0C3.10457 0 4 0.895429 4 2C4 3.10457 3.10457 4 2 4C0.89543 4 0 3.10457 0 2C0 0.89543 0.89543 0 2 0Z"
                        fill="#757575"
                      />
                    </svg>
                  </button>
                  <template #content="{ close }">
                    <ul
                      @click="close()"
                      class="whitespace-nowrap flex flex-col py-2 text-[#757575] text-[15px] bg-white shadow-lg rounded-lg"
                    >
                      <li
                        @click="go_edit_page(data)"
                        class="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.77 3.05899L11.4652 2.36383C12.617 1.21206 14.4844 1.21206 15.6362 2.36383C16.7879 3.51561 16.7879 5.38301 15.6362 6.53479L14.941 7.22995M10.77 3.05899C10.77 3.05899 10.8569 4.53621 12.1604 5.83963C13.4638 7.14306 14.941 7.22995 14.941 7.22995M10.77 3.05899L4.37912 9.44992C3.94625 9.8828 3.72981 10.0992 3.54367 10.3379C3.3241 10.6194 3.13585 10.924 2.98226 11.2463C2.85205 11.5195 2.75526 11.8099 2.56167 12.3906L1.74136 14.8516M14.941 7.22995L8.55008 13.6209C8.1172 14.0538 7.90077 14.2702 7.66212 14.4563C7.38061 14.6759 7.07602 14.8641 6.75373 15.0177C6.48052 15.1479 6.19014 15.2447 5.60938 15.4383L3.14844 16.2586M3.14844 16.2586L2.54688 16.4592C2.26108 16.5544 1.94599 16.48 1.73297 16.267C1.51995 16.054 1.44557 15.7389 1.54084 15.4531L1.74136 14.8516M3.14844 16.2586L1.74136 14.8516"
                            stroke="#757575"
                            stroke-width="1.5"
                          />
                        </svg>
                        <p>ویرایش</p>
                      </li>
                      <li
                        @click="delete_row(data)"
                        class="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.87793 3C7.18681 2.12611 8.02024 1.5 8.9999 1.5C9.97956 1.5 10.813 2.12611 11.1219 3"
                            stroke="#757575"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          />
                          <path
                            d="M15.3751 4.5H2.625"
                            stroke="#757575"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          />
                          <path
                            d="M14.125 6.375L13.78 11.5493C13.6473 13.5405 13.5809 14.5361 12.9322 15.1431C12.2834 15.75 11.2856 15.75 9.29001 15.75H8.70999C6.71439 15.75 5.71659 15.75 5.06783 15.1431C4.41907 14.5361 4.3527 13.5405 4.21996 11.5493L3.875 6.375"
                            stroke="#757575"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          />
                          <path
                            d="M7.125 8.25L7.5 12"
                            stroke="#757575"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          />
                          <path
                            d="M10.875 8.25L10.5 12"
                            stroke="#757575"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          />
                        </svg>
                        <p>حذف</p>
                      </li>
                    </ul>
                  </template>
                </Popper>
              </div>
            </template>

            <template #Image="data">
                <img
                :src="data.value.Image || defaultImage"
                alt="Product Image"
                class="w-8 h-8"
                />
            </template>
          </vue3-datatable>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import Vue3Datatable from "@bhplugin/vue3-datatable";
  import Popper from "vue3-popper";
  import axios from "axios";
  import "@bhplugin/vue3-datatable/dist/style.css";
  import Swal from "sweetalert2";
  import { showAlert } from "../../utils/alert";
  import { onMounted, ref, computed } from "vue";
  import { useRouter } from "vue-router";
  import defaultImage from '../../assets/images/defaultIcon.svg'
  
  const router = useRouter();
  const dataTable = ref(null);
  const rows = ref([]);
  const searchQuery = ref("");
  
  const cols = ref([
    { field: "Id", title: "شناسه", isUnique: true },
    { field: "Title", title: "نام" },
    { field: "C_OR_R", title: "C_OR_R" },
    { field: "Price", title: "قیمت" },
    { field: "Category", title: "دسته بندی" },
    { field: "Description", title: "توضیحات" },
    { field: "Image", title: "تصویر" },
    { field: "menu", title: "" },
  ]);
  
  const filteredRows = computed(() => {
    if (!searchQuery.value) return rows.value;
    return rows.value.filter((row) =>
      Object.values(row).some((val) =>
        String(val).toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    );
  });
  
  const fetch_data = () => {
    axios
      .get(`https://ahuan.ir/api/foods?type=T&cat=test`)
      .then((res) => {
        rows.value = res.data;
      })
      .catch((error) => {
        if (error?.response?.data?.info?.[0]?.message) {
          showAlert(error?.response?.data?.info?.[0]?.message?.fa);
        } 
      });
  };
  
  const go_edit_page = (data) => {
    let id = data.value.Id;
    router.push({ name: "editProduct", params: { id } });
  };
  
  const delete_row = (data) => {
    const toast = Swal.mixin({
      position: "center",
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonText: "انصراف",
      confirmButtonText: "تایید",
      customClass: {
        actions: "swal-actions",
      },
    });
    toast
      .fire({
        title: "آیا از حذف اطمینان دارید؟",
      })
      .then((res) => {
        if (res.isConfirmed) {
          axios
            .delete(`https://ahuan.ir/api/foods/${data.value.Id}`)
            .then(() => {
              fetch_data();
              showAlert("محصول با موفقیت حذف شد");
            })
            .catch((error) => {
              showAlert(error?.response?.data?.info?.[0]?.message?.fa);
            });
        }
      });
  };
  
  const create_product = () => {
    router.push({ name: "createProduct" });
  };
  
  onMounted(() => {
    fetch_data();
  });
  </script>
  
  <style>
  .datatable {
    width: 90%;
    margin: 0 auto;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    padding: 10px;
    position: relative;
  }
  
  .bh-table-responsive {
    height: auto !important;
    max-height: 70vh !important;
    overflow-y: auto !important;
    position: relative;
  }
  
  .bh-table-responsive table.bh-table-compact {
    width: 100%;
  }
  
  .bh-table-responsive table.bh-table-compact tbody tr td {
    text-align: start;
    padding: 10px !important;
  }
  
  .bh-table-compact thead th {
    background-color: #f8fafc;
    color: #1e293b;
    font-weight: 600;
    padding: 10px !important;
  }
  
  .bh-table-hover tbody tr:hover {
    background-color: #f1f5f9;
    transition: background-color 0.2s;
  }
  
  .bh-pagination {
    display: flex;
    justify-content: center;
    margin-top: 1.5rem;
    gap: 8px;
  }
  
  .popper {
    position: fixed !important;
    left: 50px !important;
    width: 120px;
    border-radius: 8px;
    background-color: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 10000;
  }
  
  .dropdown div button {
    background-color: transparent !important;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .bh-pagination-info span{
    display: none;
  }
  </style>