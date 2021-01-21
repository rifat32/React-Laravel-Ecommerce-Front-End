
import ReusableScript from './reusableProduct';
export default function script() {
	ReusableScript()
	var slider = window.tns({
		container: '.single',
		items: 1,
		controlsContainer: "#customize-controls",
		navContainer: "#customize-thumbnails",
		navAsThumbnails: true,
		autoplay: false,
		autoplayTimeout: 1000,
		swipeAngle: false,
        speed: 400
	  });
}