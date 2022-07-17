import RevSlider, { Slide, Caption } from "react-rev-slider";

import slide1 from "assets/img/home/slide/Slide-1.png";
import slide2 from "assets/img/home/slide/Slide-2.png";
import slide3 from "assets/img/home/slide/Slide-3.png";

const config = {
  delay: 7000,
  startwidth: 800,

  startheight: 600,
  hideThumbs: 10,
  fullWidth: "off",
  forceFullWidth: "off",
};

const HomeBanner = () => {
  return (
    <>
      <RevSlider config={config}>
        <Slide
          src={slide1}
          data-transition="fade"
          data-slotamount="default"
          data-easein="Power4.easeInOut"
          data-easeout="Power4.easeInOut"
          data-masterspeed="2000"
          data-thumb={slide1}
          data-rotate="0"
          data-fstransition="fade"
          data-fsmasterspeed="1500"
          data-fsslotamount="7"
          data-saveperformance="off"
          data-title="materialize Material"
          data-description=""
          alt="slidebg1"
          data-bgfit="contain"
          data-bgposition="center"
          data-bgrepeat="no-repeat"
          slideProperties={{
            "data-transition": "fade",
            "data-slotamount": "7",
            "data-masterspeed": "1500",
          }}
        ></Slide>

        <Slide
          src={slide2}
          data-transition="fade"
          data-slotamount="default"
          data-easein="Power4.easeInOut"
          data-easeout="Power4.easeInOut"
          data-masterspeed="2000"
          data-thumb={slide2}
          data-rotate="0"
          data-fstransition="fade"
          data-fsmasterspeed="1500"
          data-fsslotamount="7"
          data-saveperformance="off"
          data-title="materialize Material"
          data-description=""
          alt="slidebg1"
          data-bgfit="contain"
          data-bgposition="center"
          data-bgrepeat="no-repeat"
          slideProperties={{
            "data-transition": "fade",
            "data-slotamount": "7",
            "data-masterspeed": "1500",
          }}
        ></Slide>

        <Slide
          src={slide3}
          data-transition="fade"
          data-slotamount="default"
          data-easein="Power4.easeInOut"
          data-easeout="Power4.easeInOut"
          data-masterspeed="2000"
          data-thumb={slide3}
          data-rotate="0"
          data-fstransition="fade"
          data-fsmasterspeed="1500"
          data-fsslotamount="7"
          data-saveperformance="off"
          data-title="materialize Material"
          data-description=""
          alt="slidebg1"
          data-bgfit="contain"
          data-bgposition="center"
          data-bgrepeat="no-repeat"
          slideProperties={{
            "data-transition": "fade",
            "data-slotamount": "7",
            "data-masterspeed": "1500",
          }}
        ></Slide>
      </RevSlider>
    </>
  );
};

export default HomeBanner;
