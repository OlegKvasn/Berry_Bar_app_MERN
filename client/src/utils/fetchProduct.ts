interface ProductPageParams {
  params: { id: string };
}
export const fetchProduct = ({ params }: ProductPageParams) => {
  return new Promise((res) => {
    setTimeout(
      () =>
        res({
          name: "Pizza Hut",
          weight: 300,
          id: params.id,
        }),
      3000
    );
  });
};
