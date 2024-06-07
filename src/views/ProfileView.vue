<template>
  <div class="flex flex-col justify-center items-center gap-4 mt-12">
    <div v-if="loading" class="fixed inset-0 flex justify-center">
      <spinning-loader :large="true" />
    </div>
    <div
      class="border border-darkBlue w-max m-auto p-4 rounded-lg flex flex-col gap-6"
      v-else
    >
      <div>
        <label class="font-bold inline-block text-sm md:text-base w-[8rem]"
          >FIRST NAME</label
        ><input
          class="border border-darkBlue w-[8rem] md:w-[15rem] p-1 md:p-2 rounded"
          :disabled="!editProfile"
          v-model.trim="editUserDetails.firstName"
          @input="validate('firstName')"
        />
        <p v-if="editProfile" class="text-red-500">
          {{ errorMessages.firstName }}
        </p>
      </div>
      <div>
        <label class="font-bold inline-block text-sm md:text-base w-[8rem]"
          >LAST NAME</label
        ><input
          class="border border-darkBlue w-[8rem] md:w-[15rem] p-1 md:p-2 rounded"
          :disabled="!editProfile"
          v-model.trim="editUserDetails.lastName"
          @input="validate('lastName')"
        />
        <p v-if="editProfile" class="text-red-500">
          {{ errorMessages.lastName }}
        </p>
      </div>
      <div>
        <label class="font-bold inline-block text-sm md:text-base w-[8rem]"
          >EMAIL</label
        ><input
          class="border border-darkBlue w-[8rem] md:w-[15rem] p-1 md:p-2 rounded bg-gray-300"
          :value="userDetails.email"
          disabled
        />
      </div>
      <div>
        <label class="font-bold inline-block text-sm md:text-base w-[8rem]"
          >Mobile No</label
        >
        <input
          class="border border-darkBlue w-[8rem] md:w-[15rem] p-1 md:p-2 rounded"
          :disabled="!editProfile"
          v-model.trim="editUserDetails.mobileNo"
          @input="handleMobileInput(editUserDetails, validate)"
        />
        <p v-if="editProfile" class="text-red-500">
          {{ errorMessages.mobileNo }}
        </p>
      </div>
      <div class="flex items-center">
        <label class="font-bold inline-block text-sm md:text-base w-[8rem]"
          >Profile Pic</label
        >
        <div v-if="editUserDetails.profilePhoto" class="flex">
          <img
            :src="editUserDetails.profilePhoto"
            alt="profile pic"
            class="w-16 h-16 rounded-full object-cover"
          />
          <Icon
            v-if="editProfile"
            icon="charm:cross"
            class="cursor-pointer"
            @click="deleteProfilePic"
          />
        </div>
        <div v-if="!editProfile && !editUserDetails.profilePhoto">
          <div>N/A</div>
        </div>
        <div
          v-if="!editUserDetails.profilePhoto && editProfile"
          class="flex flex-col gap-4"
        >
          <input
            type="file"
            @change="uploadImage"
            class="mt-4 w-min"
            accept="image/*"
          />
        </div>
      </div>
      <p v-if="editProfile" class="text-red-500">
        {{ errorMessages.profilePhoto }}
      </p>
      <div class="w-[60%] m-auto mt-4">
        <form-button
          :buttonText="!editProfile ? `Edit Profile` : `Save Profile`"
          @onSubmit="handleProfile"
          :loading="buttonLoader"
        />
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { Icon } from "@iconify/vue";
import FormButton from "@/components/FormButton.vue";
import SpinningLoader from "@/components/SpinningLoader.vue";
import { useProfile } from "@/composables/profile";
import { useRegister } from "@/composables/register";

const {
  handleProfile,
  uploadImage,
  deleteProfilePic,
  loading,
  editProfile,
  editUserDetails,
  validate,
  errorMessages,
  buttonLoader,
  userDetails,
} = useProfile();

const { handleMobileInput } = useRegister();
</script>
  