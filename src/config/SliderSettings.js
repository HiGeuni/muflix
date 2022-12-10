const SliderSettings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 3,
  draggable: true, // 드래그 가능 여부
  responsive: [
    // 반응형 웹 구현 옵션
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 1080, // 화면 사이즈 1152px
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    }
  ]
};

export default SliderSettings;
