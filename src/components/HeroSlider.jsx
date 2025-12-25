

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function HeroSlider() {
  const slides = [
    {
      title: "Swap Skills. Grow Together.",
      sub: "Music • Coding • Language • Yoga",
      image: "https://images.unsplash.com/photo-1556761175-4b46a572b786",
    },
    {
      title: "Learn Locally, Teach Globally.",
      sub: "Find providers near you",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644",
    },
  ];

  return (
    <div className="my-6">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 2800 }}
        pagination={{ clickable: true }}
        loop
      >
        {slides.map((s, i) => (
          <SwiperSlide key={i}>
            <div
              className="h-56 md:h-72 lg:h-96 rounded-2xl bg-cover bg-center grid place-items-center text-center relative overflow-hidden"
              style={{ backgroundImage: `url(${s.image})` }}
            >
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/40"></div>

              {/* Text content */}
              <div className="relative text-white px-4">
                <h2 className="text-2xl md:text-4xl font-bold drop-shadow-lg">
                  {s.title}
                </h2>
                <p className="opacity-90 mt-2">{s.sub}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
