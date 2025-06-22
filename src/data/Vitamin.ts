export type VitaminInfoData = {
    id: string;
    title: string;
    url: string;
    imgUrl: string;
    vitaminContent: VitaminContent[];
    mineralContent: VitaminContent[];
  };

export type VitaminContent = {
  name: string,
  amount: string,
  percentage: string
}