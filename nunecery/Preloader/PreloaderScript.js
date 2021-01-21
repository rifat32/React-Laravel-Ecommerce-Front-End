export default function script() {
    window.$(window).on('load', function () {
        window.$(".loader").fadeOut();
        window.$("#preloder").delay(200).fadeOut("slow");
    });
}