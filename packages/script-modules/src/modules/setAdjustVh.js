// To specify the height of screen excluding the address bar

// iOS (Safari) >= 15.4
//   .h-screen {
//     height: 100vh; /* fallback */
//     height: 100dvh;
//   }

// Others:
//   .h-screen {
//     height: 100vh; /* fallback */
//     height: calc(var(--vh, 1vh) * 100);
//   }

export const setAdjustVh = function () {
  const onResize = () => {
    // We execute the same script as before
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }

  // We listen to the resize event
  window.addEventListener('resize', onResize)
  onResize()
}
