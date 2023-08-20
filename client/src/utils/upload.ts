import axios from "axios";

const upload = async (file: File | null) => {
  if (!file) {
    return;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "berrybar");

  try {
    const res = await axios.post(import.meta.env.CLOUDINARY_URL, formData);

    const { url } = res.data;
    return url;
  } catch (err) {
    console.log(err);
  }
};

export default upload;
