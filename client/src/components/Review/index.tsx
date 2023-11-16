import { useQuery } from "@tanstack/react-query";
import style from "./review.module.scss";
import { IReview, IUser } from "../../lib/types";
import { newRequest } from "../../lib/utils";

const Review = ({ review }: { review: IReview }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [review._id],
    queryFn: () =>
      newRequest(`/users/${review.userId}`).then((res) => {
        return res.data as IUser;
      }),
  });

  return (
    <div className={style.review}>
      {isLoading ? (
        "Завантажується"
      ) : error ? (
        "Щось пішло не так"
      ) : (
        <div className={style.user}>
          <img src={data?.img || "/img/noavatar.jpg"} alt="avatar" />
          <span>{data?.username}</span>
        </div>
      )}

      <div className={style.stars}>
        {Array(review.star)
          .fill(1)
          .map((item, i) => (
            <img src="/img/star.png" alt="star" key={`${i}${item}`} />
          ))}
        <span>{review.star}</span>
      </div>
      <p>{review.desc}</p>
      <div className={style.helpful}>
        <span>Корисно?</span>
        <img src="/img/like.png" alt="like" />
        <span>Так</span>
        <img src="/img/dislike.png" alt="like" />
        <span>Ні</span>
      </div>
      <hr />
    </div>
  );
};

export default Review;
