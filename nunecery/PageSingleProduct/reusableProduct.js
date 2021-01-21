
export default function script() {
	window.$(".fw-size-choose .sc-item label, .pd-size-choose .sc-item label").on('click', function () {
        window.$(".fw-size-choose .sc-item label, .pd-size-choose .sc-item label").removeClass('active');
        window.$(this).addClass('active');
    });
    var rangeSlider = window.$(".price-range"),
        minamount = window.$("#minamount"),
        maxamount = window.$("#maxamount"),
        minPrice = rangeSlider.data('min'),
        maxPrice = rangeSlider.data('max');
        rangeSlider.slider({
        range: true,
        min: minPrice,
        max: maxPrice,
        values: [minPrice, maxPrice],
        slide: function (event, ui) {
            minamount.val('$' + ui.values[0]);
            maxamount.val('$' + ui.values[1]);
        }
    });
    minamount.val('$' + rangeSlider.slider("values", 0));
    maxamount.val('$' + rangeSlider.slider("values", 1));
}