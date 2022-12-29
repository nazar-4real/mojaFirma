$(function () {

  // Fixed header when page scrolled && toggle to top button
  window.addEventListener('scroll', () => {

    if (window.scrollY > 1) {
      document.querySelector('.header').classList.add('fixed');
    } else {
      document.querySelector('.header').classList.remove('fixed');
    }

    const toTop = document.querySelector('.to-top');

    const scrollToTop = (e) => {
      e.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }

    if (window.scrollY > 500) {
      toTop.classList.add('show');
      toTop.addEventListener('click', scrollToTop);
    } else {
      toTop.classList.remove('show');
      toTop.removeEventListener('click', scrollToTop);
    }

  })
  // ----- //

  // Theme switcher
  $('.theme').on('click', function (e) {

    const themeSwitcher = (classAction, icon, text) => {

      if (classAction === 'removeClass') {
        $(e.currentTarget).removeClass('dark');
        $('html').removeClass('dark');
      } else if (classAction === 'addClass') {
        $(e.currentTarget).addClass('dark');
        $('html').addClass('dark');
      }

      $('.theme__icon').attr('src', icon);
      $('.theme__name').text(text);
    }

    if (e.currentTarget.classList.contains('dark')) {
      themeSwitcher('removeClass', './images/header/moon.svg', 'Night');
    } else {
      themeSwitcher('addClass', './images/header/sun.svg', 'Day');
    }
  });
  // ----- //

  // Loader overlay
  setTimeout(function () {
    $(".loader").addClass('hide');
  }, 2000);
  // ----- //

  // Show / hide navigation menu
  $(".menu__btn").on("click", function () {
    $(".nav").slideToggle();
    $("body").toggleClass("darken");
  });
  // ----- //

  // White spots in the buttons
  const mainLink = document.querySelectorAll(".main__link");

  function s(e) {
    var s = document.createElement("div"),
      i = Math.max(this.clientWidth, this.clientHeight),
      t = this.getBoundingClientRect(),
      l = s.style;
    (l.width = l.height = i + "px"), (l.left = e.clientX - t.left - i / 2 + "px"), (l.top = e.clientY - t.top - i / 2 + "px"), s.classList.add("pulse"), this.appendChild(s);
  }

  Array.prototype.forEach.call(mainLink, function (e) {
    e.addEventListener("click", s);
  });
  // ----- //

  // Configure the Select2 plugin
  $(".langs").select2({
    dropdownCssClass: "langs__dropdown",
    selectionCssClass: "langs__select",
    width: "55px",
    minimumResultsForSearch: Infinity
  });
  // ----- //

  // Show search field when hovering over the search icon
  $(".search__btn").on("click", function (e) {
    e.preventDefault();
    $(".search__field").addClass("show");
    $(".search__field-close").addClass("show");
    $('body').addClass('darken');

    if ($('.search__field').hasClass('show')) {
      $('.search__btn').on('click', function (e) {
        $(e.target).closest('form').trigger('submit');
      });
    }
  });
  // ----- //

  // Hide search field when click over the cross button
  $(".search__field-close").on("click", function () {
    $(".search__field").removeClass("show");
    $(".search__field").nextAll('.error').fadeOut();
    $(".search__field-close").removeClass("show");
    $('body').removeClass('darken');
  });
  // ----- //


  // Some validation for the search field
  function errorDo(text) {
    $(this).nextAll('.error').remove();
    $(this).after(`<span class="error">${text}</span>`);
  }

  $('.search').on('submit', function (e) {
    if ($(this).find('input').val() == '' && $(this).find('input').prop('required')) {
      e.preventDefault();

      errorDo.call($('input'), 'The field must not be empty');

      setTimeout(() => {
        $(this).find('input').next('.error').fadeOut();
      }, 1500);

      return;
    }

    localStorage.clear();
    localStorage.setItem('searchPhrase', $('.search__field').val());
  });

  $(window).on('load', () => {
    $('.search-phrase').text(localStorage.getItem('searchPhrase'));
  })
  // ----- //

  // Initialize nad configure the slider in the Themes block
  $(".themes__slider").slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    infinite: !1,
    prevArrow: '<button class="slider-btn slider-prev"><img class="slider-icon prev" src="./images/arrow-left.svg" alt="Slider Prev"></button>',
    nextArrow: '<button class="slider-btn slider-next"><img class="slider-icon next" src="./images/arrow-right.svg" alt="Slider Next"></button>',
    responsive: [
      { breakpoint: 1199, settings: { slidesToShow: 4 } },
      { breakpoint: 991, settings: { slidesToShow: 3 } },
      { breakpoint: 767, settings: { slidesToShow: 2 } },
      { breakpoint: 575, settings: { slidesToShow: 1 } },
    ],
  });
  // ----- //

  // Initialize a common slider for the remaining blocks
  $(".slider__slides").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: !1,
    prevArrow: '<button class="slider-btn slider-prev"><img class="slider-icon prev" src="./images/arrow-left.svg" alt="Slider Prev"></button>',
    nextArrow: '<button class="slider-btn slider-next"><img class="slider-icon next" src="./images/arrow-right.svg" alt="Slider Next"></button>',
    responsive: [
      { breakpoint: 767, settings: { slidesToShow: 2 } },
      { breakpoint: 575, settings: { slidesToShow: 1 } },
    ],
  });
  // ----- //

  // Initialize the slider for the Help block
  $(".help__cards").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: !1,
    prevArrow: '<button class="slider-btn slider-prev"><img class="slider-icon prev" src="./images/arrow-left.svg" alt="Slider Prev"></button>',
    nextArrow: '<button class="slider-btn slider-next"><img class="slider-icon next" src="./images/arrow-right.svg" alt="Slider Next"></button>',
    responsive: [
      { breakpoint: 1199, settings: { slidesToShow: 3 } },
      { breakpoint: 767, settings: { slidesToShow: 2 } },
      { breakpoint: 575, settings: { slidesToShow: 1 } },
    ],
  });
  // ----- //

  // Move the button to the end of the New block when the window loaded
  $(window).on("load", function () {
    if ($(this).width() < 766) {
      $(".new").find(".main__link").appendTo($(".new > .container"))
    } else {
      $(".new").find(".main__link").appendTo($(".new .main__head"))
    }
  });
  // ----- //

  // Smooth scroll to block of menu items
  $('.nav__menu-link').on('click', function () {
    let secOffset = $(this).attr('href');
    $('html, body').animate({
      scrollTop: $(secOffset).offset().top - 90
    }, 800);
    return false;
  });
  // ----- //

  // Set articles quantity on results page
  $('.articles-quantity-number').text($('.results__cards > .results__card').length);
  // ----- //
});