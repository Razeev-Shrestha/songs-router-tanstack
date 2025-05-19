import img1 from "@/assets/image1.webp";
import img2 from "@/assets/image2.webp";
import img3 from "@/assets/image3.jpeg";
import img4 from "@/assets/image4.jpg";
import img5 from "@/assets/image5.jpeg";

const imgArr = [img1, img2, img3, img4, img5];

export function generateRandomImage() {
  const randomIndex = Math.floor(Math.random() * imgArr.length);
  return imgArr[randomIndex];
}

const colorCombo = [
  "from-yellow-500 to-amber-500",
  "m-gray-500 to-slate-500",
  "from-purple-500 to-violet-500",
  "from-amber-500 to-yellow-500",
];

export function getRandomColorCombo() {
  const randomIndex = Math.floor(Math.random() * colorCombo.length);
  return colorCombo[randomIndex];
}
