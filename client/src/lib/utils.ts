import axios from "axios";
import { IUser } from "./types";

export const newRequest = axios.create({
  baseURL: "http://localhost:5000/api/",
  withCredentials: true,
});

export const upload = async (file: File | null) => {
  if (!file) {
    return;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "berrybar");

  try {
    const res = await axios.post(import.meta.env.VITE_CLOUDINARY_URL, formData);

    const { url } = res.data;
    return url;
  } catch (err) {
    console.log(err);
  }
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("currentUser") || "{}") as IUser;
};

// interface ProductPageParams {
//   params: { id: string };
// }
// export const fetchProduct = ({ params }: ProductPageParams) => {
//   return new Promise((res) => {
//     setTimeout(
//       () =>
//         res({
//           name: "Pizza Hut",
//           weight: 300,
//           id: params.id,
//         }),
//       3000
//     );
//   });
// };
