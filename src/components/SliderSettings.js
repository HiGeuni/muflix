const SliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    draggable : true,     //드래그 가능 여부 
    responsive: [ // 반응형 웹 구현 옵션
    {  
      breakpoint: 960, //화면 사이즈 960px
      settings: {
        slidesToShow: 3
      } 
    },
    { 
      breakpoint: 768, //화면 사이즈 768px
      settings: {    
        slidesToShow: 2
      } 
    }
  ]
};

export default SliderSettings;