import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import Review from "../pages/Review.jsx";
const reviews = [
  {
    description:
      "A captivating masterpiece! This book took me on an emotional rollercoaster, leaving me breathless and longing for more. A must-read for anyone who enjoys a compelling story with unforgettable characters.",
    imageurl:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",

    name: "John Doe",
    rating: 5,
  },
  {
    description:
      "An insightful exploration of the human condition. This book delves deep into complex themes with grace and sensitivity. It's a thought-provoking read that stays with you long after you've turned the final page.",
    imageurl: "person2.jpg",
    name: "James Smith",
    rating: 4,
  },
  {
    description:
      "Thrilling from start to finish! This book had me on the edge of my seat, eagerly turning pages to uncover the next twist. A gripping tale that keeps you guessing until the very end.",
    name: "Jane austin",
    rating: 4,
    imageurl: "person3.webp",
  },
  {
    description:
      "A poetic masterpiece! The prose in this book is absolutely stunning, weaving a tapestry of words that transports you to another world. A lyrical journey that speaks to the soul.",
    name: "Jack shroff",
    rating: 5,
    imageurl: "person4.jpg",
  },
  {
    description:
      "Heartwarming and uplifting! This book is like a warm hug on a cold day. It's filled with charm, humor, and genuine emotion. A delightful read that leaves you with a smile.",
    name: "kyle kennedy",
    rating: 5,
    imageurl: "person5.jpg",
  },
  {
    description:
      "A groundbreaking work of literature! This book pushes boundaries and challenges conventions in the most remarkable way. It's bold, innovative, and impossible to put down. A true game-changer.",
    name: "kate perry",
    rating: 5,
    imageurl: "person6.jpg",
  },
];

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
    slidesToSlide: 2,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 2,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Slider = () => {
  const review = reviews.map((item, i) => (
    <Review
      key={i}
      description={item.description}
      url={item.imageurl}
      name={item.name}
      rating={item.rating}
    />
  ));
  return (
    <div className="">
      <Carousel
        showDots={true}
        responsive={responsive}
        keyBoardControl={true}
        removeArrowOnDeviceType={["tablet", "mobile"]}
      >
        {review}
      </Carousel>
    </div>
  );
};

export default Slider;
