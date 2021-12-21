export const contentBlockVariants = {
  initial: {
    opacity: 0,
    y: 200
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.8,
      type: "spring", damping: 30, mass: 0.95, stiffness: 100
    }
  },
  exit: {
    opacity: 0,
    y: 200,
    transition: {
      duration: 0.4
    }
  }
};

let easing = [0.175, 0.85, 0.42, 0.96];
export const formVariants = {
  initial: { y: 900, transition: { delay: 0.1, duration: 0.1, ease: easing } },
  animate: {
    y: 0,
    transition: { ease: easing, type: "spring", damping: 10, mass: 0.75, stiffness: 100 }
  }
};
