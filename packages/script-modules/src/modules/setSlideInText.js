export const setSlideInText = function () {
  gsap.utils.toArray('.u-sit_group').forEach(function (el) {
    gsap
      .timeline({
        duration: 0.42,
        scrollTrigger: {
          trigger: el,
          start: 'top 100%-=180px',
        },
      })
      .from(
        el.querySelectorAll('.u-sit_line-bg'),
        {
          stagger: 0.2,
          x: '-100%',
          ease: 'power3.out',
        },
        0
      )
      .from(
        el.querySelectorAll('.u-sit_text'),
        {
          stagger: 0.2,
          x: '-100%',
          ease: 'power3.out',
        },
        0.36
      )

      .from(
        el.querySelectorAll('.u-sit_text-item'),
        {
          stagger: 0.2,
          x: '100%',
          ease: 'power3.out',
        },
        0.36
      )
  })
}
