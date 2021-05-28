import React, { useState } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  Modal,
} from "reactstrap";
import * as Icon from "react-bootstrap-icons";

const items = [
  {
    src: "../img/trang-ti-16194117174325.jpg",
    trailer: "https://www.youtube.com/embed/l2XBzUZidig",
  },
  {
    src: "../img/lat-mat-48h-16177782153424.png",
    trailer: "https://www.youtube.com/embed/kBY2k3G6LsM",
  },
  {
    src: "../img/ban-tay-diet-quy-evil-expeller-16177781815781.png",
    trailer: "https://www.youtube.com/embed/uqJ9u7GSaYM",
  },
];

export default function Slider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const toggleTrailer = () => setModalTrailer(!modalTrailer);
  const [modalTrailer, setModalTrailer] = useState(false);

  const slides = items.map((item, index) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={index}
      >
        <img src={item.src} />
        <div className="slider__iconPlayTrailer">
          <Icon.PlayCircle size={60} onClick={toggleTrailer} />
          <Modal
            className="modalTrailler"
            isOpen={modalTrailer}
            toggle={toggleTrailer}
          >
            <iframe
              src={item.trailer}
              width="900px"
              height="468px"
              frameborder="1"
              autoplay
            ></iframe>
          </Modal>
        </div>
      </CarouselItem>
    );
  });

  return (
    <Carousel activeIndex={activeIndex} next={next} previous={previous}>
      <CarouselIndicators
        items={items}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>
  );
}