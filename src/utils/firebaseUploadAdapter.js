import { storage } from "@/firebase";
import { usePostStore } from "@/stores/postStore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storeToRefs } from "pinia";

const { descriptonImagesId } = storeToRefs(usePostStore());

class FirebaseUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          const imageId = Date.now();
          const storageRef = ref(
            storage,
            `posts/postDescriptions/${imageId}`
          );
          uploadBytes(storageRef, file)
            .then((snapshot) => getDownloadURL(snapshot.ref))
            .then((url) => {
              descriptonImagesId.value = [...descriptonImagesId.value, imageId];
              resolve({
                default: url,
              });
            })
            .catch((error) => {
              reject(error);
            });
        })
    );
  }

  abort() {}
}

export function FirebaseUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new FirebaseUploadAdapter(loader);
  };
}
