import { useRouter } from 'next/router';
import Head from 'next/head';

import styles from '../../styles/Feed.module.css';
import { Toolbar } from '../../components/toolbar';

const Feed = ({ pageNumber, articles }) => {
  const router = useRouter();

  const onArticleClick = (url) => {
    // window.location.href = url;
    window.open(url, '_blank');
  };

  const onPageBtnClick = (e) => {
    const scrollFunc = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };

    if (e.target.name === 'desc') {
      if (pageNumber > 1) {
        router.push(`/feed/${pageNumber - 1}`).then(() => scrollFunc());
      }
    }
    if (e.target.name === 'incr') {
      if (pageNumber < 5) {
        router.push(`/feed/${pageNumber + 1}`).then(() => scrollFunc());
      }
    }
  };

  return (
    <>
      <Head>
        <title>News feed page</title>
        <meta
          name="description"
          content={`This is the US news feed page #${pageNumber}`}
        />
        <meta
          property="og:title"
          content={`This is the US news feed page #${pageNumber}`}
        />
      </Head>
      <div className="page-container">
        <Toolbar />
        <div className={styles.main}>
          {articles.map((article) => (
            <li key={`id-${article.publishedAt}`} className={styles.post}>
              <h1 onClick={() => onArticleClick(article.url)}>
                {article.title}
              </h1>
              <p>{article.description}</p>
              {!!article.urlToImage && (
                <img src={article.urlToImage} alt="articleImage" width={500} />
              )}

              <h6>Author: {article.author}</h6>
              <p>{article.publishedAt}</p>
            </li>
          ))}
        </div>
        <div className={styles.paginator}>
          <button
            name="desc"
            onClick={onPageBtnClick}
            className={pageNumber === 1 ? styles.disabled : styles.active}
          >
            Previous Page
          </button>
          <div>#{pageNumber}</div>
          <button
            name="incr"
            onClick={onPageBtnClick}
            className={pageNumber >= 5 ? styles.disabled : styles.active}
          >
            Next Page
          </button>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  const pageNumber = ctx.query.pageId;

  if (!pageNumber || pageNumber < 1 || pageNumber > 5) {
    return {
      props: {
        articles: [],
        pageNumber: 1,
      },
    };
  }

  const apiResponse = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&pageSize=5&page=${pageNumber}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}`,
      },
    }
  );

  const data = await apiResponse.json();

  return {
    props: {
      pageNumber: Number.parseInt(pageNumber),
      articles: data.articles,
    },
  };
};

export default Feed;
