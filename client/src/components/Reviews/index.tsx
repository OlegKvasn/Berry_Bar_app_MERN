import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Review from "../review";
import style from "./reviews.module.scss";
import { useState } from "react";
import { newRequest } from "../../lib/utils";
import { IReview } from "../../lib/types";
import { AxiosError } from "axios";

interface InitialState {
  star: 1 | 2 | 3 | 4 | 5;
  desc?: string;
}

interface INewReview extends InitialState {
  productId: string | undefined;
}

const Reviews = ({ productId }: { productId: string | undefined }) => {
  const [values, setValues] = useState<InitialState>({
    star: 5,
    desc: "",
  });
  const [mutationErrorMessage, setMutationErrorMessage] = useState<
    string | null
  >(null);

  const queryClient = useQueryClient();
  const {
    isLoading,
    error: queryError,
    data,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      newRequest(`/reviews/${productId}`).then((res) => {
        return res.data as IReview[];
      }),
  });

  const { mutate, status } = useMutation({
    mutationFn: (newReview: INewReview) => {
      return newRequest.post("/reviews", newReview);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
    },
    onError: (err) => {
      let message = "Щось пішло не так";

      if (err instanceof AxiosError) {
        message = err.response?.data.error || "Помилка сервера";
      }
      setMutationErrorMessage(message);
    },
  });

  const nandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({
      productId,
      desc: values.desc,
      star: values.star,
    });
    setValues({
      star: 5,
      desc: "",
    });
  };

  return (
    <div className={style.reviews}>
      <h2>Відгуки:</h2>
      {isLoading
        ? "Завантажується"
        : queryError
        ? "Щось пішло не так"
        : data?.map((review) => <Review key={review._id} review={review} />)}
      <form action="" className={style.add} onSubmit={nandleSubmit}>
        <h3>Написати відгук</h3>
        <textarea
          name="desc"
          placeholder="Напишіть вашу думку"
          cols={30}
          rows={5}
          onChange={({ target }) => {
            setValues({ ...values, [target.name]: target.value });
          }}
        />
        <select
          name="star"
          id=""
          onChange={({ target }) => {
            setValues({ ...values, [target.name]: target.value });
          }}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
        <button type="submit" className={style.button}>
          {status === "loading" ? "Додається..." : "Відправити"}
        </button>
        <p>{status === "error" ? mutationErrorMessage : null}</p>
      </form>
    </div>
  );
};

export default Reviews;
