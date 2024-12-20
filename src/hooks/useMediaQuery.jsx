import {useState, useEffect} from "react";
import propTypes from "prop-types";

export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
   const listener = () => setMatches(media.matches)
    window.addEventListener("resize", listener)
    return () => window.removeEventListener("resize", listener);
  }, [matches, query])

  return matches
}
useMediaQuery.propTypes = {
  query: propTypes.string.isRequired
}


