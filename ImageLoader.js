import { useState, useEffect, useRef } from "react";

const ImageLoader = (props) => {
  const {
    src,
    alt = "image",
    width,
    height,
    threshold,
    placeholderSrc,
    postImgLoaded,
    root,
    rootMargin,
    postVisible,
    wrapperClassName
  } = props;
  const [isVisible, setIsVisible] = useState(false);
  const ctStyle = {
    display: "inline-block",
    width: width || "auto",
    height: height || "auto",
    backgroundSize: "100% 100%"
  };
  if (placeholderSrc) {
    ctStyle.backgroundImage = `url(${placeholderSrc})`;
  } else {
    ctStyle.backgroundColor = "grey";
  }
  const currentRef = useRef();
  useEffect(() => {
    const currentElem = currentRef.current;
    let observer;
    if (
      "IntersectionObserver" in window &&
      "IntersectionObserverEntry" in window &&
      "intersectionRatio" in window.IntersectionObserverEntry.prototype
    ) {
      const handleIntersect = (entries, observer) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entries[0].target);
          observer.disconnect();
        }
      };
      const observer = new window.IntersectionObserver(handleIntersect, {
        root: root || null,
        rootMargin: rootMargin || "100px",
        threshold: threshold || 0
      });
      if (currentElem && observer && observer.observe) {
        observer.observe(currentElem);
      }
    } else {
      setIsVisible(true);
    }
    return () => {
      if (observer && observer.disconnect) {
        observer.disconnect();
      }
    };
  }, [root, rootMargin, threshold]);
  useEffect(() => {
    if (isVisible && postVisible) {
      postVisible();
    }
  }, [isVisible, postVisible]);

  return (
    <span ref={currentRef} style={ctStyle} className={wrapperClassName}>
      {isVisible ? (
        <img
          onLoad={() => {
            postImgLoaded && postImgLoaded();
          }}
          alt={alt}
          src={src}
          style={{ width: width, height: height }}
        />
      ) : (
        <span
          style={{
            display: "inline-block",
            width: width || "auto",
            height: height || "auto",
            backgroundColor: "grey"
          }}
        ></span>
      )}
    </span>
  );
};

export default ImageLoader;
