/* eslint-disable react/no-array-index-key */
import styles from "./CommunityDetailSkeleton.module.scss";

const CommunityDetailSkeleton = () => {
  return (
    <div className={styles.container}>
      {/* Title */}
      <div className={styles.title} />

      {/* Info section */}
      <div className={styles.info}>
        <div className={styles.author}>
          <div className={styles.authorLabel} />
          <div className={styles.authorName} />
          <div className={styles.authorDate} />
        </div>
        <div className={styles.icons}>
          <div className={styles.icon} />
          <div className={styles.icon} />
          <div className={styles.icon} />
          <div className={styles.icon} />
        </div>
      </div>

      {/* Content box */}
      <div className={styles.contentBox}>
        <div className={styles.contentLine} />
        <div className={styles.contentLine} />
        <div className={styles.contentLine} />
        <div className={styles.contentLineShort} />
      </div>

      {/* Images */}
      <div className={styles.images}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className={styles.imageBox} />
        ))}
      </div>

      {/* React buttons */}
      <div className={styles.reactButtons}>
        <div className={styles.reactButton} />
        <div className={styles.reactButton} />
      </div>

      {/* Comment section */}
      <div className={styles.commentSection}>
        <div className={styles.commentTitle} />
        <div className={styles.commentWrapper}>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className={styles.comment}>
              <div className={styles.commentHeader}>
                <div className={styles.commentAuthor} />
                <div className={styles.commentDate} />
              </div>
              <div className={styles.commentText} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityDetailSkeleton;
