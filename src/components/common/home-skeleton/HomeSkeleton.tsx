import { useState, useEffect } from "react";
import styles from "./HomeSkeleton.module.scss";

interface HomeSkeletonProps {
  isMobile?: boolean;
}

const HomeSkeleton = ({ isMobile: propIsMobile }: HomeSkeletonProps = {}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (propIsMobile !== undefined) {
      setIsMobile(propIsMobile);
      return;
    }

    const mobileResize = () => {
      if (window.innerWidth < 920) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    mobileResize();
    window.addEventListener("resize", mobileResize);

    return () => {
      window.removeEventListener("resize", mobileResize);
    };
  }, [propIsMobile]);

  return (
    <div
      className={`${styles.landingContainer} ${isMobile ? styles.mobile : ""}`}
    >
      {isMobile ? (
        <>
          {/* Mobile Top Bar */}
          <div className={styles.mobileTopBar}>
            <div className={styles.topBarText} />
          </div>

          {/* Mobile App Container - Full Screen */}
          <div className={styles.appContainer}>
            {/* Status Bar */}
            <div className={styles.statusBar}>
              <div className={styles.time} />
              <div className={styles.icons}>
                <div className={styles.signal} />
                <div className={styles.wifi} />
                <div className={styles.battery} />
              </div>
            </div>

            {/* Header */}
            <div className={styles.header}>
              <div className={styles.logo} />
              <div className={styles.loginButton} />
            </div>

            {/* Search Bar */}
            <div className={styles.searchBar}>
              <div className={styles.searchInput} />
              <div className={styles.searchIcon} />
            </div>

            {/* New Apartment Section */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionTitle} />
                <div className={styles.moreButton} />
              </div>
              <div className={styles.cardList}>
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className={styles.card}>
                    <div className={styles.cardImage}>
                      <div className={styles.bookmarkIcon} />
                      <div className={styles.locationInfo} />
                    </div>
                    <div className={styles.cardInfo}>
                      <div className={styles.brandName} />
                      <div className={styles.apartName} />
                      <div className={styles.details} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending Apartment Section */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionTitle} />
                <div className={styles.moreButton} />
              </div>
              <div className={styles.cardList}>
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className={styles.card}>
                    <div className={styles.cardImage}>
                      <div className={styles.bookmarkIcon} />
                      <div className={styles.locationInfo} />
                    </div>
                    <div className={styles.cardInfo}>
                      <div className={styles.brandName} />
                      <div className={styles.apartName} />
                      <div className={styles.details} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Desktop - Left Panel - App UI */}
          <div className={styles.previewDevice}>
            <div className={styles.appContainer}>
              {/* Status Bar */}
              <div className={styles.statusBar}>
                <div className={styles.time} />
                <div className={styles.icons}>
                  <div className={styles.signal} />
                  <div className={styles.wifi} />
                  <div className={styles.battery} />
                </div>
              </div>

              {/* Header */}
              <div className={styles.header}>
                <div className={styles.logo} />
                <div className={styles.loginButton} />
              </div>

              {/* Search Bar */}
              <div className={styles.searchBar}>
                <div className={styles.searchInput} />
                <div className={styles.searchIcon} />
              </div>

              {/* New Apartment Section */}
              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionTitle} />
                  <div className={styles.moreButton} />
                </div>
                <div className={styles.cardList}>
                  {Array.from({ length: 2 }).map((_, i) => (
                    <div key={i} className={styles.card}>
                      <div className={styles.cardImage}>
                        <div className={styles.bookmarkIcon} />
                        <div className={styles.locationInfo} />
                      </div>
                      <div className={styles.cardInfo}>
                        <div className={styles.brandName} />
                        <div className={styles.apartName} />
                        <div className={styles.details} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trending Apartment Section */}
              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionTitle} />
                  <div className={styles.moreButton} />
                </div>
                <div className={styles.cardList}>
                  {Array.from({ length: 2 }).map((_, i) => (
                    <div key={i} className={styles.card}>
                      <div className={styles.cardImage}>
                        <div className={styles.bookmarkIcon} />
                        <div className={styles.locationInfo} />
                      </div>
                      <div className={styles.cardInfo}>
                        <div className={styles.brandName} />
                        <div className={styles.apartName} />
                        <div className={styles.details} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Right Panel - Service Intro */}
      {!isMobile && (
        <div className={styles.serviceIntro}>
          <div className={styles.logoWrapper} />
          <div className={styles.logoName}>
            <div className={styles.logoTitle} />
            <div className={styles.logoSub} />
          </div>
          <div className={styles.serviceBody}>
            <div className={styles.serviceTitle} />
            <div className={styles.serviceDescription} />
          </div>
          <div className={styles.serviceList}>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className={styles.serviceButton}>
                <div className={styles.buttonIcon} />
                <div className={styles.buttonText} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeSkeleton;
