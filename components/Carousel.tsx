import React, {useState, useEffect} from "react";

const carouselItems = [
    "https://i.pinimg.com/564x/7f/b6/bb/7fb6bb246e2a434300581a811911c4e5.jpg",
    "https://i.pinimg.com/564x/1f/08/65/1f0865ae231cd9efe9bdd7147a92d4a1.jpg",
    "https://i.pinimg.com/564x/bd/d0/94/bdd09439260b11313694e9301a11574b.jpg",
    "https://i.pinimg.com/564x/4a/e5/d3/4ae5d3074757a801a194a46b84f095cb.jpg",
    "https://i.ibb.co/VTXNMc0/cb81deb6-65d5-4e15-93d2-6dbd221d9aed.jpg"
]

const Carousel = ({ interval = 3000 }) => {
    const numItems = carouselItems.length;
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const carouselInterval = setInterval(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % numItems);
        }, interval);
        return () => clearInterval(carouselInterval);
      }, [interval, numItems]);
      
    return (
        <div className="max-w-[1400px] mx-auto relative group p-16 flex justify-center"
        style={{ height: "400px", width: "700px" }}>
            <div className="relative overflow-hidden rounded-2xl bg-center flex items-center"
            style={{ maxHeight: "100", maxWidth: "100%" }} >
        <img src={carouselItems[currentIndex]} className="rounded-3xl object-cover h-full w-full" />
      </div>
    </div>
    )
}

export default Carousel;