import React, { useRef } from "react";
import Swiper from "react-id-swiper";
import { SlideContainer } from "./SliderContainer";

const Slider = () => {
  const ref = useRef<any>(null);

  const goNext = () => {
    if (ref.current !== null && ref.current?.swiper !== null) {
      ref.current?.swiper.slideNext();
    }
  };

  const goPrev = () => {
    if (ref.current !== null && ref.current.swiper !== null) {
      ref.current?.swiper.slidePrev();
    }
  };

  const swiperParams = {
    loop: true
  }

  return (
    <SlideContainer>
      <button onClick={goPrev}>Prev</button>
      <Swiper ref={ref} {...swiperParams}>
        <div style={{ width: "100vw", textAlign: 'center' }}>1</div>
        <div style={{ width: "100vw", textAlign: 'center' }}>2</div>
        <div style={{ width: "100vw", textAlign: 'center' }}>3</div>
      </Swiper>
      <button onClick={goNext}>Next</button>
    </SlideContainer>
  );
};

export default Slider;
