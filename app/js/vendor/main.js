$(function() {

    AOS.init({
        once: true
    });
    $(window).on('load', function() {
        AOS.refresh();
    });
    $('.counter').counterUp({
        // delay: 30
    });

    initMap();

    $(".slider-inner").addClass("owl-carousel").owlCarousel({
        items: 1,
        nav: true,
        loop: true,
        autoplay: true,
        autoplayTimeout: 5000
    });
    $(".menu-toggle").on("click", function(e) {
        e.preventDefault();
        $(".header__nav").slideToggle();
    });

    if ($(".slider-img").length) {
        $(".slider-img").addClass("owl-carousel").owlCarousel({
            items: 1,
            nav: true,
            autoplay: true,
            loop: true,
            autoplayTimeout: 5000
        })
    }
    if ($(".slider-img2").length) {
        $(".slider-img2").addClass("owl-carousel").owlCarousel({
            items: 1,
            nav: true,
            loop: true,
            animateOut: 'fadeOut',
            animateIn: 'fadeIn',
            autoplayTimeout: 5000
        })
    }
    if ($(".gallery").length) {
        $(".gallery").addClass("owl-carousel").owlCarousel({
            items: 1,
            nav: true,
            loop: true
                // autoplay: true,
                // autoplayTimeout: 5000
        })
    }

    function slider_popup() {
        if ($(".house-popup-slider").length) {
            $(".house-popup-slider").addClass("owl-carousel").owlCarousel({
                items: 1,
                nav: true,
                dots: true,
                autoplay: true,
                loop: true,
                autoplayTimeout: 5000
            });
        }
    }


    $("[data-open-popup]").on("click", function(e) {
        $("body").addClass("hidde")
        var content = $($(this).attr("data-open-popup"));
        content.fadeIn();
        e.preventDefault();
        slider_popup();
        setTimeout(function() {
            content.find(".owl-prev").css("right", content.find(".owl-dots").outerWidth())
        }, 100);
        $(".popup__inner").css("margin-top", 0)
        setTimeout(function() {
            content.find(".popup__inner").addClass("open");
            var window_height = $(window).outerHeight();
            var content_height = content.find(".popup__inner").outerHeight();

            if (content_height < window_height) {
                $(".popup__inner").css("margin-top", (window_height - content_height) / 2);
            } else {
                $(".popup__inner").css("margin-top", 0)
            }

        }, 300)

    });

    $(".popup-close").on("click", function(e) {
        e.preventDefault();
        $("body").removeClass("hidde")
        $(".popup").fadeOut();
        $(".popup__inner").removeClass("open");
    })

    $(".popup").on("click", function() {
        $(".popup").fadeOut();
        $("body").removeClass("hidde")
    })
    $(".popup__inner").on("click", function(e) {
        e.stopPropagation()
    })
    $(window).resize(function() {
        var window_height = $(window).outerHeight();
        var content_height = $(".popup__inner.open").outerHeight();

        $(".popup__inner").css("margin-top", 0)

        if (content_height < window_height) {
            $(".popup__inner.open").css("margin-top", (window_height - content_height) / 2)
        } else {
            $(".popup__inner.open").css("margin-top", 0)
        }
    })

    if ($(".multiple-select").length) {
        $(".multiple-select").multipleSelect({
            selectAllText: m_vars.wybierzwszystko,
            allSelected: m_vars.wszystkie,
            countSelected: m_vars.wybrane
        })
    }

    $("body").append("<span class='scroll-top'></span>")

    $(window).bind('scroll', function() {
        if ($(window).scrollTop() > ($(window).outerHeight() / 2)) {
            $('.scroll-top').addClass("open")
        } else {
            $('.scroll-top').removeClass("open")
        }
    });

    $(document).on("click", ".scroll-to", function(event) {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - $(".header").outerHeight()
                }, 1000);
                return false;
            }
        }
    });

    $('.scroll-top').on("click", function() {
        $('html,body').animate({
            scrollTop: 0
        }, 1000);
    });

    $('.select-custom select').customSelect({
        stroke: false
    });


    $(document).on("mousemove", "[data-tooltip]", function(event) {
        var hover = $($(this).attr("data-tooltip"));
        var data = $(this).data("maphilight");
        if (data !== undefined) {
            data.fillOpacity = 0.5;
            $(this).data('maphilight', data).trigger('alwaysOn.maphilight');
        }
        hover.css({ top: event.pageY + 40, left: event.pageX - 95 }).show();
    })
    $(document).on("mouseout", "[data-tooltip]", function(event) {
        var hover = $($(this).attr("data-tooltip"));
        var data = $(this).data("maphilight");
        if (data !== undefined) {
            data.fillOpacity = 0.37;
            $(this).data('maphilight', data).trigger('alwaysOn.maphilight');
        }
        hover.stop().hide()
    })

    $(document).on("change", "[data-show-hide]", function(e) {
        var _ = $(this).find(":selected");
        $(_.attr("data-hide")).hide();
        $(_.attr("data-show")).fadeIn();
        $(_.attr("data-show")).find("map").imageMapResize();
        setTimeout(function() {
            $(_.attr("data-show")).find(".maphilighted").remove();
            $(_.attr("data-show")).find("img").maphilight({
                'alwaysOn': true
            });
        }, 1000);
    });

    $('.search-list-build map').imageMapResize();


    if ($("[data-trigger]").length) {
        $("[data-trigger]").trigger("change");

    }

    $('.search-list-build img').maphilight({
        fillColor: 'eb600a',
        fillOpacity: 0.77,
        stroke: false
    });

    // $(".search-list-floor__inner img").maphilight({
    //     'alwaysOn': true
    // })

    $("select").on("change", function() {
        var value = $(this).val();

        if ($(this).attr("name") == 'metraz_od') {

            var select = $(this).closest(".form-wrap").next(".form-wrap").find("select");

            select.find("option:first-child").prop("selected", true).trigger("change")

            select.find("option").each(function() {
                if (parseInt($(this).html()) <= value) {
                    $(this).attr("disabled", true)
                } else {
                    $(this).attr("disabled", false)
                }
            })

        } else {

        }
    })


});

function initMap() {
    var findMap = document.getElementsByClassName('gmap');
    var scriptUrl = "http://maps.google.com/maps/api/js" + "?key=AIzaSyCg3z65RVUcKhNs6loK8eoJ8clxBjvfmhM";

    var loadMap = function() {
        for (var i = findMap.length - 1; i >= 0; i--) {
            var myMap = findMap[i];
            var infowindow = null;

            if ($(window).width() > 1170) {
                var center = new google.maps.LatLng(myMap.getAttribute('data-lat-center'), myMap.getAttribute('data-lon-center'))
            } else {
                var center = new google.maps.LatLng(myMap.getAttribute('data-lat'), myMap.getAttribute('data-lon'))
            }


            var map = new google.maps.Map(myMap, {
                zoom: parseInt(myMap.getAttribute('data-zoom')) || 13,
                center: center,
                disableDefaultUI: false,
                scrollwheel: false
            });

            var markerOptions = {
                map: map,
                icon: 'http://domhygge2.getid.com.pl/wp-content/themes/hygge/images/marker.png',
                animation: google.maps.Animation.DROP,
                zIndex: 100,
                position: new google.maps.LatLng(myMap.getAttribute('data-lat'), myMap.getAttribute('data-lon'))
            };

            var marker = new google.maps.Marker(markerOptions);


            if ($(".map-legend").length) {
                // Uzupełnianie mapy markerami
                var markers = window.places_map.markers;
                var markers_table = [];
                $.each(markers, function(i, item) {
                    var position = new google.maps.LatLng(item.lat, item.lon);
                    var markerOptions = {
                        id: item.id,
                        map: map,
                        icon: item.markerIcon,
                        position: position,
                        title: item.title,
                        type: item.type,
                        zIndex: 1,
                        movies: item.movies,

                        animation: google.maps.Animation.DROP
                    };
                    var gmarker = new google.maps.Marker(markerOptions);
                    var contentString = item.title;

                    infowindow = new SnazzyInfoWindow({
                        marker: gmarker,
                        content: contentString,
                        closeWhenOthersOpen: true,
                        showCloseButton: false
                    });
                    markers_table.push(gmarker)

                    google.maps.event.addListener(gmarker, "mouseover", function() {
                        this.setOptions({ zIndex: 30 });
                    });
                    google.maps.event.addListener(gmarker, "click", function() {
                        this.setOptions({ zIndex: 30 });
                    });
                });

                // Filtrowanie markerów
                function filter_markers() {
                    $(".si-float-wrapper").hide()
                    $(".map-legend__filter [data-filter]").each(function() {

                        var category = $(this).attr("data-filter");
                        var visible_marker = $(this).hasClass("visible");

                        for (var i in markers_table) {
                            if (markers_table[i].type == category || category.length === 0) {
                                if (visible_marker) {
                                    markers_table[i].setVisible(true);
                                } else {
                                    markers_table[i].setVisible(false);
                                }
                            }
                        }

                    })

                }
                filter_markers();

                $(".map-legend__filter [data-filter]").on("click", function() {
                    $(this).toggleClass("visible");
                    filter_markers();
                })

                $(".show-markers").on("click", function() {
                    $(".map-legend__filter [data-filter]").addClass("visible")
                    filter_markers()
                })

                $(".hide-markers").on("click", function() {
                    $(".map-legend__filter [data-filter]").removeClass("visible")
                    filter_markers()
                })
            }



            google.maps.event.addDomListener(window, 'resize', function() {
                if ($(window).width() > 1170) {
                    var center = new google.maps.LatLng(myMap.getAttribute('data-lat-center'), myMap.getAttribute('data-lon-center'))
                } else {
                    var center = new google.maps.LatLng(myMap.getAttribute('data-lat'), myMap.getAttribute('data-lon'))
                }
                map.setCenter(center);
            });
        }
    };
    loadMap()
}