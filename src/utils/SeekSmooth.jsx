import gsap from 'gsap'

export const SeekSmooth = (label, setIsUpdating, tl, storeAndScroll) => {

    setIsUpdating(false);
    gsap.to(tl.current, {
      duration: 2.5,
      progress: tl.current.labels[label] / tl.current.duration(),
      ease: "power4.inOut",
      onComplete: () => {
        tl.current.progress(storeAndScroll);
        setIsUpdating(true)
      }
    });
    return true;
  };



