import { useEffect } from "react";
// scroll bar
import "simplebar-react/dist/simplebar.min.css";

// lazy image
import "react-lazy-load-image-component/src/effects/blur.css";

import NProgress from "nprogress";
// next
import { useRouter } from "next/router";
//
import StyledProgressBar from "./styles";

// ----------------------------------------------------------------------

export default function ProgressBar() {
  const router = useRouter();

  NProgress.configure({ showSpinner: false });

  useEffect(() => {
    const handleStart = () => {
      NProgress.start();
    };
    const handleStop = () => {
      NProgress.done();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  return <StyledProgressBar />;
}
