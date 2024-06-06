<template>
  <div class="flex flex-col justify-center items-center gap-4 mt-12">
    <div v-if="loading">LOADING USER...</div>
    <div
      class="border border-darkBlue w-max m-auto p-4 rounded-lg flex flex-col gap-4"
      v-else
    >
      <div>
        <label class="font-bold inline-block w-[8rem]">FIRST NAME</label
        ><input
          class="border border-darkBlue px-2 py-1"
          :disabled="!editProfile"
          v-model="editUserDetails.firstName"
        />
      </div>
      <div>
        <label class="font-bold inline-block w-[8rem]">LAST NAME</label
        ><input
          class="border border-darkBlue px-2 py-1"
          :disabled="!editProfile"
          v-model="editUserDetails.lastName"
        />
      </div>
      <div>
        <label class="font-bold inline-block w-[8rem]">EMAIL</label>
        <input
          class="border border-darkBlue px-2 py-1"
          :disabled="!editProfile"
          v-model="editUserDetails.email"
        />
      </div>
      <div>
        <label class="font-bold inline-block w-[8rem]">Mobile No</label>
        <input
          class="border border-darkBlue px-2 py-1"
          :disabled="!editProfile"
          v-model="editUserDetails.mobileNo"
        />
      </div>
      <div class="flex items-center">
        <label class="font-bold inline-block w-[8rem]">Profile Pic</label>
        <img
          v-if="editUserDetails?.profilePhoto && !editProfile"
          :src="editUserDetails.profilePhoto"
          alt="profile pic"
          class="w-16 h-16 rounded-full object-cover"
        />
        <div v-else>
          <div v-if="editProfile" class="flex flex-col gap-4">
            <input
              type="file"
              @change="uploadImage"
              class="mt-4 w-min"
              accept="image/*"
            />
            <img
              v-if="editUserDetails?.imageUrl"
              :src="editUserDetails?.imageUrl"
              class="w-12 h-12 rounded-full object-cover"
            />
          </div>
          <div v-else>N/A</div>
        </div>
      </div>
      <button
        class="w-max border-2 border-darkBlue text-darkBlue px-4 py-1 m-auto mt-2 rounded-lg hover:bg-darkBlue hover:text-white"
        @click="handleProfile"
      >
        {{ !editProfile ? `Edit Profile` : `Save Profile` }}
      </button>
    </div>
  </div>
</template>
  
<script setup>
import { onMounted, reactive, ref } from "vue";
import { useUser } from "@/composables/user";
import { getDocs, query, updateDoc, where } from "firebase/firestore";
import { storage, usersRef } from "@/firebase";
import {
  ref as firebaseRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

const loading = ref(false);
const { getCurrentUser, getUserByUID, userDetails } = useUser();
const editProfile = ref(false);

const editUserDetails = reactive({
  firstName: "",
  lastName: "",
  email: "",
  mobileNo: "",
  profilePhoto: "",
  imageUrl: "",
});

onMounted(async () => {
  loading.value = true;
  const user = await getCurrentUser();
  await getUserByUID(user?.uid);
  editUserDetails.firstName = userDetails.value.firstName
    ? userDetails.value.firstName
    : "N/A";
  editUserDetails.lastName = userDetails.value.lastName
    ? userDetails.value.lastName
    : "N/A";
  editUserDetails.email = userDetails.value.email
    ? userDetails.value.email
    : "N/A";
  editUserDetails.mobileNo = userDetails.value.mobileNo
    ? userDetails.value.mobileNo
    : "N/A";
  editUserDetails.profilePhoto = userDetails.value.profilePhoto
    ? `${userDetails.value.profilePhoto}`
    : false;
  loading.value = false;
  //   console.log({ user: userDetails.value, edit: editUserDetails });
  console.log(storage, firebaseRef, uploadBytes, getDownloadURL);
});

const handleProfile = async () => {
  if (!editProfile.value) {
    editProfile.value = true;
    for (let key in editUserDetails) {
      if (editUserDetails[key] === "N/A") {
        editUserDetails[key] = "";
      }
    }
  } else {
    console.log(userDetails.value);
    const q = query(
      usersRef,
      where("uid", "==", "iktzs0rXLPhjzM6tdwRQfGjX1Is2")
    );
    const querySnapshot = await getDocs(q);
    const docRef = querySnapshot.docs[0].ref;
    console.log(docRef);
    // const storageRef = firebaseRef(storage, userDetails.uid);
    // const snapshot = await uploadBytes(
    //   storageRef,
    //   editUserDetails.profilePhoto
    // );

    // const downloadURL =  await getDownloadURL(snapshot.ref);
    // editUserDetails.imageUrl = downloadURL;
    console.log("HERE")
    await updateDoc(docRef, editUserDetails);
  }
};

const uploadImage = (e) => {
  const profilePhoto = e.target.files[0];
  if (profilePhoto && profilePhoto.type.startsWith("image/")) {
    editUserDetails.profilePhoto = profilePhoto;
    editUserDetails.imageUrl = URL.createObjectURL(profilePhoto);
  } else {
    console.log("Please Select Image Only");
  }
};
</script>
  