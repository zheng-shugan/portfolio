import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../utils/posts";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from '../../styles/utils.module.css';

// 文章组件
export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>

      <article>
        {/* 文章标题 */}
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        {/* 发布时间 */}
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        {/* 文章内容 */}
        <div dangerouslySetInnerHTML={{ __html: postData.contentHTML }} />
      </article>
    </Layout>
  )
}
export async function getStaticPaths() {
  const paths = getAllPostIds()

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)

  return {
    props: {
      postData
    }
  }
}
