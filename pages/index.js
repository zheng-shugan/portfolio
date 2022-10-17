import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import Link from "next/link";
import Date from "../components/date";
import utilStyles from '../styles/utils.module.css'

import { getSortedPostsData } from "../utils/posts";

// 接收从 getStaticProps 返回的数据
export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hey，我是网络专业的大三学生郑书淦</p>
        <p>目前在学习前端技术栈，对 Vue 及其生态有极大的兴趣</p>
      </section>

      {/* 文章列表 */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>博客文章</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

// 获取项目中的静态资源
export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
