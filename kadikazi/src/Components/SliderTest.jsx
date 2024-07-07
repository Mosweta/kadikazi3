import React from 'react'
import { CCarousel } from '@coreui/react'
import { CCarouselCaption } from '@coreui/react'
import { CCarouselItem } from '@coreui/react'
import { CImage} from '@coreui/react'
import image1 from './img/carousel-1.jpg';
import image2 from './img/carousel-2.jpg';
import image3 from './img/carousel-3.jpg';
const SliderTest = () => {
  return (
    <CCarousel controls transition="crossfade">
  <CCarouselItem>
    <CImage className="d-block w-100" src={image1} alt="slide 1" />
    <CCarouselCaption className="d-none d-md-block">
      <h5>First slide label</h5>
      <p>Some representative placeholder content for the first slide.</p>
    </CCarouselCaption>
  </CCarouselItem>
  <CCarouselItem>
    <CImage className="d-block w-100" src={image2} alt="slide 2" />
    <CCarouselCaption className="d-none d-md-block">
      <h5>Second slide label</h5>
      <p>Some representative placeholder content for the first slide.</p>
    </CCarouselCaption>
  </CCarouselItem>
  <CCarouselItem>
    <CImage className="d-block w-100" src={image3} alt="slide 3" />
    <CCarouselCaption className="d-none d-md-block">
      <h5>Third slide label</h5>
      <p>Some representative placeholder content for the first slide.</p>
    </CCarouselCaption>
  </CCarouselItem>
</CCarousel>
  )
}

export default SliderTest