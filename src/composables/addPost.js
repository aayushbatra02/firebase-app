import { reactive } from "vue";
import slugify from "slugify";

export const useAddPost = () => {
  const postDetails = reactive({
    title: null,
    slug: null,
    description: null,
    postImage: null,
    imageUrl: null,
  });

  const errorMessage = reactive({
    title: null,
    slug: null,
    description: null,
    postImage: null,
  });

  const uploadImage = (e) => {
    postDetails.postImage = null;
    const profilePhoto = e.target.files[0];
    errorMessage.postImage = null;
    if (profilePhoto && profilePhoto.type.startsWith("image/")) {
      postDetails.postImage = profilePhoto;
      postDetails.imageUrl = URL.createObjectURL(profilePhoto);
      // validate("profilePhoto");
    } else {
      errorMessage.profilePhoto = "Please Select Image Only";
    }
  };

  const deletePostImage = () => {
    postDetails.postImage = null;
    postDetails.imageUrl = null;
  };

  const addPost = () => {
    console.log("Added Post", postDetails);
  };

  const generateSlug = () => {
    postDetails.slug = slugify(postDetails.title, {
      lower: true,
      strict: true,
    });
  };

  return { uploadImage, postDetails, deletePostImage, addPost, generateSlug };
};
