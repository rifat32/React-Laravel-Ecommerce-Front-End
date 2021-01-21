
import ReusableScript from './reusableProduct';
export default function script() {
	ReusableScript()
	var slider = window.tns({
		container: '.single',
		items: 2,
		controlsContainer: "#customize-controls",
		navContainer: "#customize-thumbnails",
		navAsThumbnails: true,
		autoplay: true,
		autoplayButton: "#customize-toggle",
		autoplayTimeout: 1000,
		swipeAngle: false,
        speed: 400
	  });
}